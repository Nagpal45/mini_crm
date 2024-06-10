const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendToQueue } = require('../config/rabbitMq');

const router = express.Router();

const validateCustomer = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone').isMobilePhone().withMessage('Invalid phone number')
];

const validateOrder = [
    body('customerId').trim().notEmpty().withMessage('Customer ID is required'),
    body('product').trim().notEmpty().withMessage('Product is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than zero'),
    body('date').optional().isISO8601().toDate().withMessage('Invalid date format')
];

router.post('/customer', validateCustomer, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user._id;
    const { name, email, phone } = req.body;
    sendToQueue('customer_queue', { name, email, phone, userId });
    res.json({ message: 'Customer added' });
});

router.post('/order', validateOrder, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customerId, product, amount, date } = req.body;
    sendToQueue('order_queue', { customerId, product, amount, date });
    res.json({ message: 'Order added' });
});

module.exports = router;
