const express = require('express');
const router = express.Router();
const path = require('path');
const { mandatoryLogin } = require('../middlewares/auth');
const User = require('../models/User');
const History = require('../models/History');

router.use(mandatoryLogin);

router.get('/', (req, res) => {
    console.log('\x1b[34m>> Status Code: 200 - GET /enneagram-test');
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'test.html'));
});

router.post('/save-test-result', async (req, res) => {
    const { personality } = req.body;

    if (!personality) {
        return res.status(400).json({
            success: false,
            message: 'Personality result is required',
        });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.session.user.id,
            { personality },
            { new: true }
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        req.session.user.personality = personality;

        res.status(200).json({ success: true });
    } catch (err) {
        console.log('\x1b[31mError saving test result:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/log-history', async (req, res) => {
    const { personality } = req.body;

    if (!personality) {
        return res.status(400).json({
            success: false,
            message: 'Personality is required to log history.',
        });
    }

    try {
        const historyEntry = new History({
            userId: req.session.user.id,
            personality,
        });

        await historyEntry.save();

        res.status(201).json({
            success: true,
            message: 'History logged successfully.',
        });
    } catch (err) {
        console.log('\x1b[31mError logging history:', err);
        res.status(500).json({
            success: false,
            message: 'Server error logging history',
        });
    }
});

router.get('/history', async (req, res) => {
    try {
        const history = await History.find({
            userId: req.session.user.id,
        }).sort({ takenAt: -1 });

        res.json({ success: true, history });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch history',
        });
    }
});

module.exports = router;
