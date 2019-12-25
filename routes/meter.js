var express = require('express');
var router = express.Router();
var PropertyModel = require('../models/property')

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
    address1: req.body.address1,
    address2: req.body.address2,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,
  }, {new: true}).exec(function (err, property) {
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

module.exports = router;