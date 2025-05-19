const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/User');

router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/enneagram-test');
    }
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        console.log('>> User is Logging In...');
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials' });
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            name: user.name,
            age: user.age,
            gender: user.gender,
            personality: user.personality || 'Not Set',
        };

        console.log('>> User Succesfully Login...');
        res.status(200).json({ success: true, redirect: '/enneagram-test' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signup.html'));
});

router.post('/create-account', async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            age,
            gender = 'Not Stated',
        } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            name,
            age,
            gender,
            createdAt: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
        });

        console.log('>> New Account Created...');
        console.log(
            `>> Username: ${newUser.username}; Created At: ${newUser.createdAt}`
        );

        await newUser.save();

        res.status(200).json({
            success: true,
            redirect: '/auth/login',
            user: {
                username,
                name,
                age,
                gender,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Logout failed',
            });
        }
        console.log('>> User Successfully Logged Out...');
        res.clearCookie('connect.sid');
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    });
});

module.exports = router;
