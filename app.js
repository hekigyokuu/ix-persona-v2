// << NODE MODULES : express, express-session, connect-mongo, mongoose, path, bycrypt >>
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

// << CREATING INSTANCE FOR express APP >>
const app = express();

// << ROUTER MODULE - importing router with its routes mounted >>
const routes = require('./routes/root');

const PORT = 5000;
const URI = 'mongodb://127.0.0.1:27017/IXpersona';

// << CONNECT TO MONGODB - using mongoose module >>
async function connectDB() {
    try {
        await mongoose.connect(URI);
        console.log('\x1b[32m>> SUCCESSFULLY CONNECTED TO MONGODB...');
    } catch (err) {
        console.log('\x1b[31m>> MongoDB Error:', err);
        process.exit(1);
    }
}
connectDB();

// << express-session MIDDLEWARE >>
app.use(
    session({
        secret: 'ohMyGottoItsTheRightKey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        },
        store: MongoStore.create({
            mongoUrl: URI,
        }),
    })
);

// << express MIDDLEWARE : for parsing JSON req and serving static files >>
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// << MOUNTS ALL ROUTES >>
app.use('/', routes);

// << ROUTE MIDDLEWARE : sending 404 not found page >>
app.use((req, res) => {
    console.log('\x1b[31m>> Status Code: 404 - GET /undefined');
    res.status(404).sendFile(
        path.join(__dirname, 'public', 'html', 'not-found.html')
    );
});

// << START SERVER - listening to PORT: 5000 >>
app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.log('\x1b[31m>> What happen :0?');
        console.log('\x1b[31m>> Error: ' + err);
    }
    console.log(`\n||==========================================||`);
    console.log(`\x1b[32m>> SERVER RUNNING ON http://localhost:${PORT}\n`);
});
