const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    email: String,
    phone: String,
    totalSpends: { type: Number, default: 0 },
    maxVisits: { type: Number, default: 0 },
    lastVisit: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
