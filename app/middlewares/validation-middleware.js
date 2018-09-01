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

let isUserIdValid = (req, res, next) => {
    // userId given or valid
    if(!req.body.userId || !ObjectID.isValid(req.body.userId)) {
        res.status(400).json({
            success: false,
            message: 'Please provide a valid userID;'
        });
    }
}

let isDateRangeValid = (req, res, next) => {

    let from, to;

    //not dates in query
    if(!req.query.from && !req.query.to) {
        next();
    }

    // both dates in query
    if(req.query.from && req.query.to) {

        from = moment(req.body.from, "YYYY-MM-DD", true);
        to = moment(req.body.to, "YYYY-MM-DD", true);

        if(!from.isValid() || !to.isValid()) {
            res.status(400).json({
                success: false,
                message: 'Please provide dates with the format YYYY-MM-DD'
            });
        }

        next();
    }  

    //only from defined
    if(req.query.from) {
        from = moment(req.body.from, "YYYY-MM-DD", true);
        if(!from.isValid()) {
            res.status(400).json({
                success: false,
                message: 'Please provide dates with the format YYYY-MM-DD'
            });
        }
        next();
    } else if(req.query.to) {
        to = moment(req.body.from, "YYYY-MM-DD", true);
        if(!to.isValid()) {
            res.status(400).json({
                success: false,
                message: 'Please provide dates with the format YYYY-MM-DD'
            });
        }
        req.
        next();
    }
}

let isLimitValid = (req, res, next) => {
    if( (req.query.limit && (typeof req.query.limit) === 'number') || !req.query.limit) {
        next();
    } else {
        res.status(400).json({
            success: false,
            message: 'Please provide a valid number for limit'
        });
    }
}


module.exports = {
    addExerciseValidation,
    isUserIdValid, 
    isDateRangeValid, 
    isLimitValid
};