const express = require('express');
const Exercise = require('../models/exercise');
const router = express.Router();
const moment = require('moment');


const {addExerciseValidation} = require('../middlewares/validation-middleware');

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
        date: req.body.date
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
            console.log(doc);
            Exercise
                .updateOne({_id: req.body.userId}, doc)
                .then((response) => {
                    console.log(response);
                    if(response.nModified === 1) {
                        res.status(200).json({
                            sucess: true, 
                            message: 'Exercise added',
                            userId: doc._id,
                            username: doc.username,
                            description: exerciseLog.description,
                            duration: exerciseLog.duration,
                            date: moment(exerciseLog.date, 'lll')
                            
                            

                        });
                    }
                })
        })
        .catch((err) => {
            res.send({err});
        });
});

module.exports = router;

// {
//     username: "tshadow",
//     description: "lundges",
//     duration: 5,
//     _id: "BkjJzC387",
//     date: "Wed Aug 22 2018"
//     }