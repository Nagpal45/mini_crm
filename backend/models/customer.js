const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    totalSpends: { type: Number, default: 0 },
    maxVisits: { type: Number, default: 0 },
    lastVisit: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
