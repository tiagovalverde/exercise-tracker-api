const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

//schema
const Tracker = require('./models/tracker');
// mogodb connect
let {mongoose} = require('./db/mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  

//html page setup
//hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Exercise Tracker'
    })
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

//POST /api/exercise/new-user

//POST /api/exercise/add

//GET /api/exercise/log?{userId}[&from][&to][&limit]

module.exports = app;

