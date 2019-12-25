var DB = require('./../config/db')
var mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['owner', 'tenent']
    },
    properties: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'properties'
            }
        ]
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
})

let userModel = DB.model('users', userSchema)

module.exports = userModel