const CommunicationLog = require('../models/communicationLog');
const Audience = require('../models/audience');
const axios = require('axios');

async function sendCampaign(audienceId) {
    const audience = await Audience.findById(audienceId).populate('customers');
    const logs = [];
    for (const customer of audience.customers) {
        const message = `Hi ${customer.name}, here is 10% off on your next order`;
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
        await axios.post('/api/vendor/send', { logId: log._id });
    } catch (err) {
        console.error('Error sending to vendor:', err);
    }
}

module.exports = { sendCampaign };
