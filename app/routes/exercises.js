const express = require('express');
const Exercise = require('../models/exercise');

const router = express.Router();

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

//GET /api/exercise/log?{userId}[&from][&to][&limit]

module.exports = router;