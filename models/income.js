var DB = require('./../config/db')
var mongoose = require('mongoose')

let incomeSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true
    },
    paid_on: {
        type: Date,
        required: true
    },
    remarks: {
        type: String
    },
    invisibility_array: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    }
})

let incomeModel = DB.model('incomes', incomeSchema)

module.exports = incomeModel