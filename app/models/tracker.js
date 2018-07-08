const mongoose = require('mongoose');

const trackerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    }, username: {
        type: Number,
    },
    log: [{
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
    }]
});

module.exports = mongoose.model('Tracker', trackerSchema);