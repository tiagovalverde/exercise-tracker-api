const express = require('express');
const Exercise = require('../models/exercise');
const router = express.Router();
const moment = require('moment');


const {
    addExerciseValidation,
    isUserIdValid,
    isDateRangeValid,
    isLimitValid
} = require('../middlewares/validation-middleware');

//POST /api/exercise/new-user
router.post('/new-user', (req, res, next) => {
    
    if(!req.body.username) {
        res.status(404).json({
            success: false,
            message: 'username required'
        });
    }
    
    const exercise = new Exercise({
        username: req.body.username
    });
    
    exercise.save()
    .then(response => {
        res.status(200).json({
            _id: response._id,
            username: response.username
        });
    })
    .catch(err => {
        // unique violation
        if(err.code === 11000) {
            res.status(403).json({
                sucess: false,
                    message: 'username already in use'
                });
            }
            //other message type
            res.status(500).json({
                sucess: false,
                message: 'a server error occured'
            });
        })
});

//POST /api/exercise/add
router.post('/add', addExerciseValidation,  (req, res) => {

    let exerciseLog = {
        description: req.body.description,
        duration: req.body.duration,
        date: moment(req.body.date).toDate()
    };

    Exercise
        .findById({_id: req.body.userId})
        .then((doc) => {
            if(!doc) {
                res.status(404).json({
                    sucess: false, 
                    message: 'userId not found'
                });
            }

            doc.log.push(exerciseLog);

            Exercise
                .updateOne({_id: req.body.userId}, doc)
                .then((response) => {
                    if(response.nModified === 1) {

                        res.status(200).json({
                            sucess: true, 
                            message: 'Exercise added',
                            userId: doc._id,
                            username: doc.username,
                            description: exerciseLog.description,
                            duration: exerciseLog.duration,
                            date: moment(exerciseLog.date).format('ddd MMM DD YYYY')
                        });
                    }
                })
        })
        .catch((err) => {
            res.send({err});
        });
});


/**
 * GET /api/exercise/log?{userId}[&from][&to][&limit]
 */
router.post(`/log`, isUserIdValid, isDateRangeValid, isLimitValid, (req, res) => {


    const logSearchEnum = {
        BY_ID: 0,
        BY_ID_LIMITED: 1,
        BY_ID_RANGE: 2,
        BY_ID_RANGE_LIMITED: 3,
        BY_ID_FROM: 4,
        BY_ID_FROM_LIMITED: 5,
        BY_ID_TO: 6,
        BY_ID_TO_LIMITED: 7
    }


    //both dates
    if(req.query.from && req.query.to) {


    // only from
    } else if(req.query.from) {

    // only to
    } else if(req.query.to) {
        
    // no date range
    } else {

    }


});


module.exports = router;    