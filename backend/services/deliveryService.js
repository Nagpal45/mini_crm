const { connectRabbitMQ } = require('../config/rabbitMq');
const { sendToQueue } = require('../config/rabbitMq');
const CommunicationLog = require('../models/communicationLog');

async function updateStatus(logId, status) {
    await sendToQueue('delivery_receipt_queue', { logId, status });
}

async function processDeliveryReceipts() {
    const channel = await connectRabbitMQ();
    channel.consume('delivery_receipt_queue', async (msg) => {
        if (msg !== null) {
            const { logId, status } = JSON.parse(msg.content.toString());
            const log = await CommunicationLog.findById(logId);
            if (log) {
                log.status = status;
                log.sentAt = new Date();
                await log.save();
            }
            channel.ack(msg);
        }
    });
}

module.exports = { updateStatus, processDeliveryReceipts };
