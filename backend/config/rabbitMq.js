const amqp = require('amqplib');
let channel;

async function connectRabbitMQ() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('delivery_receipt_queue', { durable: true });
    await channel.assertQueue('customer_queue', { durable: true });
    await channel.assertQueue('order_queue', { durable: true });
    return channel;
}

async function sendToQueue(queue, message) {
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}

module.exports = { connectRabbitMQ, sendToQueue };
