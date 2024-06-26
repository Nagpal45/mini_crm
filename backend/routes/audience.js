const express = require('express');
const Audience = require('../models/audience');
const Customer = require('../models/customer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, rules } = req.body;
    const userId = req.user._id; 

    const customers = await applyRules(rules, userId);
    const audience = new Audience({ userId, name, rules, customers: customers.map(c => c._id) });
    await audience.save();
    res.json(audience);
});

router.get('/all', async (req, res) => {
    const userId = req.user._id; 
    const audiences = await Audience.find({ userId });
    res.json(audiences);
});

router.post('/check-size', async (req, res) => {
    const { rules } = req.body;
    const userId = req.user._id;
    const customers = await applyRules(rules, userId);
    res.json({ size: customers.length });
});

async function applyRules(rules, userId) {
    let query = { userId };

    rules.forEach(rule => {
        const { field, operator, value } = rule;
        switch (field) {
            case 'totalSpends':
                applyCondition(query, 'totalSpends', operator, value);
                break;
            case 'maxVisits':
                applyCondition(query, 'maxVisits', operator, value);
                break;
            case 'lastVisit':
                const dateValue = new Date();
                dateValue.setMonth(dateValue.getMonth() - value);
                applyCondition(query, 'lastVisit', operator, dateValue.toISOString());
                break;
        }
    });

    console.log(query);
    const customers = await Customer.find(query);
    return customers;
}

function applyCondition(query, field, operator, value) {
    switch (operator) {
        case '>':
            query[field] = { $gt: value };
            break;
        case '>=':
            query[field] = { $gte: value };
            break;
        case '<':
            query[field] = { $lt: value };
            break;
        case '<=':
            query[field] = { $lte: value };
            break;
        case '==':
            query[field] = value;
            break;
        case '!=':
            query[field] = { $ne: value };
            break;
    }
}

module.exports = router;
