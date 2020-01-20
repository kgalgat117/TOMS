var DB = require('./../config/db')
var mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email: {
        type: String
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
        type: {
            e_rate_per_unit: Number,
            meter_type: { type: String, enum: ['domestic', 'commercial'] },
            monthly_rent: Number,
            security_deposit: Number,
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            // property: {type: mongoose.Schema.Types.ObjectId, ref: 'properties'},
            tenure_start: { type: Date },
            tenure_end: { type: Date },
            created_on: { type: Date, default: Date.now() }
        }
    },
    permanent_address: {
        type: {
            address1: String,
            address2: String,
            city: String,
            state: String,
            country: String,
            pincode: Number
        }
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
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

let userModel = DB.model('users', userSchema)

module.exports = userModel