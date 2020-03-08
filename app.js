require('dotenv').config()
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var DB = require('./config/db')

DB.on('connected', function () {
    console.log('connected to database')
})

var propertyRouter = require('./routes/property');
var meterRouter = require('./routes/meter');
var tenentRouter = require('./routes/tenent');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist/TOMS')))

app.get('/test', function (req, res) {
    function randomPhone() {
        let randomPhoneLength = 10
        let word = ''
        for (let i = 0; i < randomPhoneLength; i++) {
            let max = 9, min = 0
            let randomCharCode = Math.floor(Math.random() * (max - min + 1) + min)
            word += randomCharCode
        }
        return word
    }
    res.status(200).json({ result: randomPhone(), new: 'testing auto deploy script.. 2' })
})

app.use('/property', propertyRouter);
app.use('/meter', meterRouter);
app.use('/tenent', tenentRouter);
app.use('/user', usersRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/TOMS/index.html'));
});


module.exports = app;