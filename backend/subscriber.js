const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');

const Customer = require('./models/customer');
const Order = require('./models/order');

dotenv.config();

const app = express();

const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('connect', () => {
    console.log('Subscriber connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

mongoose.connect(process.env.MONGO)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log('Error connecting to MongoDB:', err); });

redisClient.connect().then(() => {
    redisClient.subscribe('customer_channel', (message, channel) => {
        if (channel === 'customer_channel') {
            const customerData = JSON.parse(message);
            const customer = new Customer(customerData);
            customer.save()
                .then(() => { console.log('Customer added'); })
                .catch((err) => { console.error('Error adding customer:', err); });
        }
    });

    redisClient.subscribe('order_channel', (message, channel) => {
        if (channel === 'order_channel') {
            const orderData = JSON.parse(message);
            const order = new Order(orderData);
            order.save()
                .then(() => { console.log('Order added'); })
                .catch((err) => { console.error('Error adding order:', err); });
        }
    });

    redisClient.on('message', (channel, message) => {
        console.log(`Received message from ${channel}: ${message}`);
    });

}).catch(err => {
    console.error('Failed to connect to Redis:', err);
});

app.listen(5001, () => {
    console.log('Subscriber server started on port 5001');
});
