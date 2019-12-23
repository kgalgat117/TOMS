require('dotenv').config() // create a .env file at root level.
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

var indexRouter = require('./routes/index');
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
app.use(express.static(path.join(__dirname, 'angular/dist/job')))

app.use('/recruiter', indexRouter);
app.use('/user', usersRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'angular/dist/job/index.html'));
});


module.exports = app;