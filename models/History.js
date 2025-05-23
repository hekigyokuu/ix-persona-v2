const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    personality: { type: String, required: true },
    takenAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', historySchema);
