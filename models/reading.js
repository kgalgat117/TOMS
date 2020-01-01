var DB = require('./../config/db')
var mongoose = require('mongoose')

let readingSchema = new mongoose.Schema({
    created_on: {
        type: Date,
        default: Date.now()
    },
    tenent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    reading: {
        type: Number,
        required: true
    },
    taken_on : {
        type: Date,
        required: true
    }
})

let readingModel = DB.model('readings', readingSchema)

module.exports = readingModel