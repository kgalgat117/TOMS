var DB = require('./../config/db')
var mongoose = require('mongoose')

let propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    tenent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    category: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

let propertyModel = DB.model('properties', propertySchema)

module.exports = propertyModel