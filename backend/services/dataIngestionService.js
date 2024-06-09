const { connectRabbitMQ } = require('../config/rabbitMq');
const Customer = require('../models/customer');
const Order = require('../models/order');


async function processData() {
    const channel = await connectRabbitMQ();
    channel.consume('customer_queue', async (msg) => {
        if (msg !== null) {
            const customerData = JSON.parse(msg.content.toString());
            const customer = new Customer(customerData);
            try {
                await customer.save();
                console.log('Customer added');
                channel.ack(msg);
            } catch (err) {
                console.error('Error adding customer:', err);
            }
        }
    });

    channel.consume('order_queue', async (msg) => {
        if (msg !== null) {
            const orderData = JSON.parse(msg.content.toString());
            const order = new Order(orderData);
            try {
                await order.save();
                const customer = await Customer.findById(order.customerId);
                if (customer) {
                    customer.totalSpends += order.amount;
                    customer.maxVisits += 1;
                    await customer.save();
                }
                console.log('Order added');
                channel.ack(msg);
            } catch (err) {
                console.error('Error adding order:', err);
            }
        }
    })
}

module.exports = processData;