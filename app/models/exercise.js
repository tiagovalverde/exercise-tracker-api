const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    count: {
        type: Number,
        default: 0
    },
    log: [
        {
            description: String,
            duration: Number,
            date: Date
        },
    ]
});

// getLogs

// getLogsByDateRange

// getLogsByDateFrom

// getLogsByDateTo


module.exports = mongoose.model('Exercise', exerciseSchema);

//5b8306736fca4d4094b9ba3c