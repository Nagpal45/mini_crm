const express = require('express');
const CommunicationLog = require('../models/communicationLog');
const { sendCampaign } = require('../services/campaignService');
const router = express.Router();

router.post('/:audienceId', async (req, res) => {
    const { audienceId } = req.params;
    const { message } = req.body;
    const logs = await sendCampaign(audienceId, message);
    res.json(logs);
});

router.get('/', async (req, res) => {
    const campaigns = await CommunicationLog.find().sort({ sentAt: -1 });
    res.json(campaigns);
});

module.exports = router;
