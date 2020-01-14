var express = require('express');
var router = express.Router();
var PropertyModel = require('../models/property')
var UserModel = require('../models/user')

var verifyToken = require('./../controller/middleware').verifyToken

var mongoose = require('mongoose')

router.post('/', verifyToken, function (req, res) {
  let data = req.body
  PropertyModel.countDocuments({
    name: data.name,
    owner: mongoose.Types.ObjectId(req.user._id)
  }).exec(function (err, count) {
    if (!err) {
      if (count > 0) {
        res.status(400).json({
          error: 'Name must be unique'
        })
      } else {
        data.owner = req.user._id
        new PropertyModel(data).save(function (err, created) {
          if (!err && created) {
            res.status(200).json({
              result: created
            })
            UserModel.findOneAndUpdate({
              _id: mongoose.Types.ObjectId(req.user._id)
            }, {
              $push: {
                owner_properties: created._id
              }
            }).exec(function (err, updated) { if (err && !updated) { console.log(err || 'something went wrong while updating properties in user') } })
          } else {
            res.status(400).json({
              error: err || 'something went wrong !'
            })
          }
        })
      }
    } else {
      res.status(400).json({
        error: err
      })
    }
  })
})

router.get('/all', verifyToken, function (req, res) {
  PropertyModel.find({
    owner: mongoose.Types.ObjectId(req.user._id)
  }).populate({
    path: 'tenent',
    model: UserModel,
    select: '_id name'
  }).exec(function (err, properties) {
    if (!err && properties) {
      res.status(200).json({
        result: properties
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/', verifyToken, function (req, res) {
  PropertyModel.findOne({
    _id: mongoose.Types.ObjectId(req.query.property)
  }).exec(function (err, property) {
    if (!err && property) {
      res.status(200).json({
        result: property
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.put('/', verifyToken, function (req, res) {
  PropertyModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, {
    name: req.body.name,
    category: req.body.category
  }, { new: true }).exec(function (err, property) {
    if (!err && property) {
      res.status(200).json({
        result: property
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.post('/tenent', verifyToken, function (req, res) {
  UserModel.findOne({
    email: req.body.email
  }).exec(function (err, foundTenent) {
    if (!err && foundTenent) {
      PropertyModel.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.body.property)
      }, {
        tenent: foundTenent._id
      }, {
        new: true
      }).exec(function (err, updatedProperty) {
        if (!err && updatedProperty) {
          res.status(200).json({ result: updatedProperty })
          let index = foundTenent.tenent_properties.findIndex(item=>{
            if(item.property == req.body.property){
              return true
            }
            return false
          })
          if(index == -1){
            foundTenent.tenent_properties.push({
              e_rate_per_unit: req.body.e_rate_per_unit,
              meter_type: req.body.meter_type,
              monthly_rent: req.body.rent,
              owner: req.user._id,
              property: req.body.property
            })
            console.log(foundTenent)
            foundTenent.save(function (err, updatedTenent) {
              if (!err && updatedTenent) {
                console.log('tenent updated')
              } else {
                console.log('something went wrong here', err)
              }
            })
          }
        } else {
          res.status(400).json({ error: err || 'something went wrong' })
        }
      })
    } else {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        res.status(404).json({ error: 'tenent not found' })
      }
    }
  })
})

module.exports = router;