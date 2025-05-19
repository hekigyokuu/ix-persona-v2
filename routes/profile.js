const express = require('express');
const router = express.Router();
const path = require('path');
const { mandatoryLogin } = require('../middlewares/auth');

router.use(mandatoryLogin);

router.get('/', (req, res) => {
    const username = req.session.user.username;
    res.redirect(`/profile/${username}`);
});

router.get('/:username', (req, res) => {
    const username = req.params.username;
    if (req.session.user.username !== username)
        return res
            .status(403)
            .json({ success: 'false', message: 'Access denied' });
    console.log(`>> ${username} Openned The Profile Page...`);
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'profile.html'));
});

router.get('/api/profile', (req, res) => {
    res.json({
        id: req.session.user.id,
        username: req.session.user.username,
        name: req.session.user.name,
        age: req.session.user.age,
        gender: req.session.user.gender,
        personality: req.session.user.personality || 'Not Set',
    });
});

module.exports = router;
