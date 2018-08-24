const {ObjectID} = require('mongodb');
const moment = require('moment');

let addExerciseValidation = (req, res, next) => {

    // userId given or valid
    if(!req.body.userId || !ObjectID.isValid(req.body.userId)) {
        res.status(400).json({
            success: false,
            message: 'Please provide a valid userID;'
        });
    }

    if(!req.body.description) {
        res.status(400).json({
            success: false,
            message: 'Please provide a description for your exercise;'
        });
    }

    if(!req.body.duration && (typeof req.body.duration) !== 'number' ) {
        res.status(400).json({
            success: false,
            message: 'Please provide a valid duration(minutes) for your exercise'
        });
    }

    let date = moment(req.body.date, "YYYY-MM-DD", true);
    if(!date.isValid()) {
        res.status(400).json({
            success: false,
            message: 'Please provide a valid date with with format YYYY-MM-DD'
        });
    }
    req.body.date = date.valueOf();
    next();

};

module.exports = {
    addExerciseValidation
};