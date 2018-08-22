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
    log: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);