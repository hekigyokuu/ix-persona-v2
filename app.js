const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(
    session({
        secret: 'ohMyGottoItsTheRightKey',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// array only for now storage
const users = [];

const mandatoryLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

app.get('/session', (req, res) => {
    if (req.session && req.session.user) {
        console.log('>> User is logged...');
        res.json({
            loggedIn: true,
            username: req.session.user.username,
            name: req.session.user.name,
        });
    } else {
        console.error('Session check failed', err);
        res.json({ loggedIn: false });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/enneagram-test');
    }
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find((u) => u.username === username);

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
            id: user.id,
            username: user.username,
            name: user.name,
        };

        console.log('>> User Succesfully Login...');
        res.json({ success: true, redirect: '/enneagram-test' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'signup.html'));
});

app.post('/create-account', async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            age,
            gender = 'Not Stated',
        } = req.body;

        if (users.some((u) => u.username === username)) {
            return res
                .status(400)
                .json({ success: false, message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            username,
            password: hashedPassword,
            name,
            age,
            gender,
            createdAt: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
        };
        console.log('>> New Account Created...');
        console.log(`>> Created At: ${newUser.createdAt}`);

        users.push(newUser);
        res.json({
            success: true,
            redirect: '/login',
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

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Logout failed',
            });
        }

        res.clearCookie('connect.sid');
        res.json({
            success: true,
            message: 'Logged out successfully',
        });
    });
});

app.get('/enneagram-test', mandatoryLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'test.html'));
});

app.get('/enneagram-types', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'types.html'));
});

app.get('/about-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'about.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, 'public', 'html', 'not-found.html')
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
