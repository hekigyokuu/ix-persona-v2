const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');

const path = require('path');
const routes = require('./routes/root');

const app = express();
const PORT = 5000;
const uri = 'mongodb://localhost:27017/';

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('\x1b[32m>> SUCCESSFULLY CONNECTED TO MONGODB...');
    } catch (err) {
        console.log('>> MongoDB Error:', err);
    }
}

connectDB();

app.use(
    session({
        secret: 'ohMyGottoItsTheRightKey',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res) => {
    console.log('\x1b[31m>> Status Code: 404 - GET /undefined');
    res.status(404).sendFile(
        path.join(__dirname, 'public', 'html', 'not-found.html')
    );
});

app.listen(PORT, (err) => {
    console.log(`\n\n\x1b[32mSERVER RUNNING ON http://localhost:${PORT}`);
    if (err) {
        console.log('\x1b[31m>> What happen :0?');
        console.log('\x1b[31m>> Error: ' + err);
    }
});
