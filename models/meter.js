var DB = require('./../config/db')
var mongoose = require('mongoose')

let meterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    meter_type: {
        type: String,
        required: true
    },
    rate_per_unit: {
        type: String,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties',
        required: true
    } 
})

let meterModel = DB.model('meters', meterSchema)

module.exports = meterModel