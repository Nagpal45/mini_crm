const CommunicationLog = require('../models/communicationLog');
const Audience = require('../models/audience');
const axios = require('axios');

async function sendCampaign(audienceId, message) {
    const audience = await Audience.findById(audienceId).populate('customers');
    const logs = [];
    for (const customer of audience.customers) {
        const log = new CommunicationLog({
            audienceId,
            message,
            recipient: customer.email,
            status: 'PENDING'
        });
        await log.save();
        logs.push(log);
        await sendToVendor(log);
    }
    return logs;
}

async function sendToVendor(log) {
    try {
        await axios.post('http://localhost:5000/api/vendor/send', { logId: log._id });
    } catch (err) {
        console.error('Error sending to vendor:', err);
    }
}

module.exports = { sendCampaign };