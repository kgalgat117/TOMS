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
    tenent_properties: {
        type: [{
            e_rate_per_unit: Number,
            meter_type: {type: String, enum: ['domestic', 'commercial']},
            monthly_rent: Number,
            owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
            property: {type: mongoose.Schema.Types.ObjectId, ref: 'properties'},
            created_on: {type: Date, default: Date.now()}
        }]
    },
    role: {
        type: String,
        required: true,
        enum: ['owner', 'tenent']
    },
    owner_properties: {
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