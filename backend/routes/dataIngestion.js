const express = require('express');
const { sendToQueue } = require('../config/rabbitMq');

const router = express.Router();

router.post('/customer', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    sendToQueue('customer_queue', { name, email, phone });
    res.json({ message: 'Customer added' });
});

router.post('/order', (req, res) => {
    const { customerId, product, amount, date } = req.body;
    if (!customerId || !product || !amount) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    sendToQueue('order_queue', { customerId, product, amount, date });
    res.json({ message: 'Order added' });
});


module.exports = router;