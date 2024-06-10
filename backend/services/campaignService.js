const CommunicationLog = require('../models/communicationLog');
const Audience = require('../models/audience');
const axios = require('axios');

async function sendCampaign(audienceId, message) {
    const audience = await Audience.findById(audienceId).populate('customers');
    const logs = [];
    for (const customer of audience.customers) {
        const log = new CommunicationLog({
            userId: audience.userId,
            audienceId,
            audienceName: audience.name,
            customerMail: customer.email,
            message,
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
