const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, default: 'Not Stated' },
    personality: { type: String, default: 'Not Set' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
