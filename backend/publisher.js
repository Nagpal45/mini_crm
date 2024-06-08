const express = require('express');
const cors = require('cors');
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('connect', () => {
    console.log('Publisher connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisClient.connect().then(() => {
    app.post('/api/customer', (req, res) => {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        redisClient.publish('customer_channel', JSON.stringify({ name, email, phone }));
        res.json({ message: 'Customer added' });
    });

    app.post('/api/order', (req, res) => {
        const { customer_id, amount, date } = req.body;
        if (!customer_id || !amount || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        redisClient.publish('order_channel', JSON.stringify({ customer_id, amount, date }));
        res.json({ message: 'Order added' });
    });

}).catch(err => {
    console.error('Failed to connect to Redis:', err);
});

app.listen(5000, () => {
    console.log('Publisher server started on port 5000');
});