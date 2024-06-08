const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalSpends: Number,
  numberOfVisits: Number,
  lastVisit: Date
});

module.exports = mongoose.model('Customer', CustomerSchema);
