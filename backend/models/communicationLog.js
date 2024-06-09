const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
    audienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audience', required: true },
    message: String,
    status: { type: String, enum: ['PENDING','SENT', 'FAILED'], default: 'PENDING' },
    recipient: String,
    sentAt: Date
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
