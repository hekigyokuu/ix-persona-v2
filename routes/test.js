const express = require('express');
const router = express.Router();
const path = require('path');
const { mandatoryLogin } = require('../middlewares/auth');
const User = require('../models/User');

router.use(mandatoryLogin);

router.get('/', (req, res) => {
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

        res.json({ success: true });
    } catch (err) {
        console.error('Error saving test result:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
