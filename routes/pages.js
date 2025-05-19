const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/check-session', (req, res) => {
    if (req.session && req.session.user) {
        console.log(
            `>> Check Logged at ${new Date().toLocaleString('en-PH', {
                timeZone: 'Asia/Manila',
                hour12: false,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })}...`
        );
        res.json({
            loggedIn: true,
            username: req.session.user.username,
            name: req.session.user.name,
        });
    } else {
        console.error(
            `>> No Logged at ${new Date().toLocaleString('en-PH', {
                timeZone: 'Asia/Manila',
                hour12: false,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })}...`
        );
        res.json({ loggedIn: false });
    }
});

router.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'about.html'));
});

router.get('/enneagram-types', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'types.html'));
});

module.exports = router;
