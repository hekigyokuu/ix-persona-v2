const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

router.get('/login', (req, res) => {
    if (req.session.user) {
        console.log('\x1b[34m>> Status Code: 200 - GET /enneagram-test');
        return res.redirect('/enneagram-test');
    }
    console.log('\x1b[34m>> Status Code: 200 - GET /auth/login');
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

router.post(
    '/login',
    [
        body('username', 'Username is required')
            .trim()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters'),

        body('password', 'Password is required')
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
        }

        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            console.log('\x1b[33m>> User is Logging In...');
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Username cannot be find.',
                });
            }

            console.log('>> Retrieve User Info: ' + user);

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Password does not match.',
                });
            }

            req.session.user = {
                id: user._id,
                username: user.username,
                name: user.name,
                age: user.age,
                gender: user.gender,
                personality: user.personality || 'Not Set',
            };

            console.log('\x1b[32m>> User Succesfully Login...');
            res.status(200).json({
                success: true,
                redirect: '/enneagram-test',
            });
        } catch (err) {
            console.error('\x1b[31mLogin error:', err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);

router.get('/create-account', (req, res) => {
    console.log('\x1b[34m>> Status Code: 200 - GET /auth/create-account');
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signup.html'));
});

router.post(
    '/create-account',
    [
        body('username', 'Username is required')
            .trim()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters')
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage(
                'Username can only contain letters, numbers, and underscores'
            ),
        body('password', 'Password is required')
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter')
            .matches(/[0-9]/)
            .withMessage('Password must contain at least one number'),
        body('confirmPassword', 'Password confirmation is required')
            .notEmpty()
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Passwords do not match'),
        body('age', 'Age is required')
            .isInt({ min: 13 })
            .withMessage('You must be at least 13 years old'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
        }

        try {
            const { username, password, name, age, gender } = req.body;

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already exists',
                });
            }

            // << Hashing 2^10 Iteration >>
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                password: hashedPassword,
                name: name || undefined,
                gender: gender || undefined,
                age,
            });

            console.log('>> New User Details: ' + newUser);

            console.log('\x1b[32m>> New Account Created...');
            console.log(
                `\x1b[32m>> Username: ${newUser.username}; Created At: ${newUser.createdAt}`
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
            console.log('\x1b[31m>> Signup Error:' + err);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('\x1b[31m>> User Failed To Logged Out...');
            return res.status(500).json({
                success: false,
                message: 'Logout failed',
            });
        }
        console.log('\x1b[32m>> User Successfully Logged Out...');
        res.clearCookie('connect.sid');
        res.status(200).json({
            success: true,
            redirect: '/auth/login',
            message: 'Logged out successfully',
        });
    });
});

module.exports = router;
