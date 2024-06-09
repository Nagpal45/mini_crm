const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rules: { type: Array, required: true },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});

module.exports = mongoose.model('Audience', audienceSchema);
