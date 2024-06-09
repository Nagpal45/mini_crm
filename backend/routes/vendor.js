const express = require('express');
const { updateStatus } = require('../services/deliveryService');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { logId } = req.body;
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    await updateStatus(logId, status);
    res.json({ status });
});

router.post('/delivery-receipt', async (req, res) => {
    const { logId, status } = req.body;
    await updateStatus(logId, status);
    res.json({ success: true });
});

module.exports = router;
