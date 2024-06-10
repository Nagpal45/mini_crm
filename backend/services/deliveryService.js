const { connectRabbitMQ } = require('../config/rabbitMq');
const { sendToQueue } = require('../config/rabbitMq');
const CommunicationLog = require('../models/communicationLog');

const BATCH_SIZE = 10; 
const BATCH_INTERVAL = 5000; 

let messageBuffer = [];

async function updateStatus(logId, status) {
    await sendToQueue('delivery_receipt_queue', { logId, status });
}

async function processBatch() {
    if (messageBuffer.length > 0) {
        const batch = [...messageBuffer];
        messageBuffer = [];
        
        const updatePromises = batch.map(async ({ logId, status }) => {
            const log = await CommunicationLog.findById(logId);
            if (log) {
                log.status = status;
                log.sentAt = new Date();
                await log.save();
            }
        });

        await Promise.all(updatePromises);
        console.log(`Processed batch of ${batch.length} messages`);
    }
}

async function processDeliveryReceipts() {
    const channel = await connectRabbitMQ();
    channel.consume('delivery_receipt_queue', (msg) => {
        if (msg !== null) {
            const { logId, status } = JSON.parse(msg.content.toString());
            messageBuffer.push({ logId, status });
            channel.ack(msg);

            if (messageBuffer.length >= BATCH_SIZE) {
                processBatch();
            }
        }
    });

    setInterval(processBatch, BATCH_INTERVAL);
}

module.exports = { updateStatus, processDeliveryReceipts };
