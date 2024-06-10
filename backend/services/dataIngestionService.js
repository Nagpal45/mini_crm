const { connectRabbitMQ } = require('../config/rabbitMq');
const Customer = require('../models/customer');
const Order = require('../models/order');

async function processData() {
  const channel = await connectRabbitMQ();

  const batchSize = 100; 
  let customerBatch = [];
  let orderBatch = [];

  const processCustomerBatch = async () => {
    if (customerBatch.length > 0) {
      try {
        await Customer.insertMany(customerBatch);
        customerBatch = [];
      } catch (err) {
        console.error('Error adding customers:', err);
      }
    }
  };

  const processOrderBatch = async () => {
    if (orderBatch.length > 0) {
      try {
        await Order.insertMany(orderBatch);
        await updateCustomerData(orderBatch); 
        orderBatch = [];
      } catch (err) {
        console.error('Error adding orders:', err);
      }
    }
  };

  const updateCustomerData = async (orders) => {
    const customerIds = orders.map(order => order.customerId);
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

    const bulkOps = customerIds.map(customerId => ({
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

      if (customerBatch.length >= batchSize) {
        await processCustomerBatch();
      }

      channel.ack(msg);
    }
  });

  channel.consume('order_queue', async (msg) => {
    if (msg !== null) {
      const orderData = JSON.parse(msg.content.toString());
      orderBatch.push(orderData);

      if (orderBatch.length >= batchSize) {
        await processOrderBatch();
      }

      channel.ack(msg);
    }
  });

  // Periodic batch processing
  setInterval(processCustomerBatch, 5000); // Process any remaining customers every 5 seconds
  setInterval(processOrderBatch, 5000); // Process any remaining orders every 5 seconds
}

module.exports = processData;
