const { connectRabbitMQ } = require('../config/rabbitMq');
const Customer = require('../models/customer');
const Order = require('../models/order');

async function processData() {
  const channel = await connectRabbitMQ();

  const batchSize = 100;
  let customerBatch = [];
  let orderBatch = [];
  let processingCustomerBatch = false;
  let processingOrderBatch = false;

  const processCustomerBatch = async () => {
    if (customerBatch.length > 0) {
      processingCustomerBatch = true;
      try {
        await Customer.insertMany(customerBatch);
        customerBatch = [];
      } catch (err) {
        console.error('Error adding customers:', err);
      } finally {
        processingCustomerBatch = false;
      }
    }
  };

  const processOrderBatch = async () => {
    if (orderBatch.length > 0) {
      processingOrderBatch = true;
      try {
        await Order.insertMany(orderBatch);
        await updateCustomerData(orderBatch);
        orderBatch = [];
      } catch (err) {
        console.error('Error adding orders:', err);
      } finally {
        processingOrderBatch = false;
      }
    }
  };

  const updateCustomerData = async (orders) => {
    const customerUpdates = {};

    orders.forEach(order => {
      if (!customerUpdates[order.customerId]) {
        customerUpdates[order.customerId] = {
          totalSpends: order.amount,
          maxVisits: 1,
        };
      } else {
        customerUpdates[order.customerId].totalSpends += order.amount;
        customerUpdates[order.customerId].maxVisits += 1;
      }
    });

    const bulkOps = Object.keys(customerUpdates).map(customerId => ({
      updateOne: {
        filter: { _id: customerId },
        update: {
          $inc: {
            totalSpends: customerUpdates[customerId].totalSpends,
            maxVisits: customerUpdates[customerId].maxVisits,
          },
        },
      },
    }));

    try {
      await Customer.bulkWrite(bulkOps);
    } catch (err) {
      console.error('Error updating customer data:', err);
    }
  };

  channel.prefetch(1);

  channel.consume('customer_queue', async (msg) => {
    if (msg !== null) {
      const customerData = JSON.parse(msg.content.toString());
      customerBatch.push(customerData);

      if (customerBatch.length >= batchSize && !processingCustomerBatch) {
        await processCustomerBatch();
      }

      // Acknowledge message after adding to the batch
      channel.ack(msg);
    }
  });

  channel.consume('order_queue', async (msg) => {
    if (msg !== null) {
      const orderData = JSON.parse(msg.content.toString());
      orderBatch.push(orderData);

      if (orderBatch.length >= batchSize && !processingOrderBatch) {
        await processOrderBatch();
      }

      // Acknowledge message after adding to the batch
      channel.ack(msg);
    }
  });

  // Process remaining batches at intervals
  setInterval(async () => {
    if (!processingCustomerBatch && customerBatch.length > 0) {
      await processCustomerBatch();
    }
  }, 5000);

  setInterval(async () => {
    if (!processingOrderBatch && orderBatch.length > 0) {
      await processOrderBatch();
    }
  }, 5000);
}

module.exports = processData;
