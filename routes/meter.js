var express = require('express');
var router = express.Router();
var MeterModel = require('../models/meter')

var verifyToken = require('./../controller/middleware').verifyToken

var mongoose = require('mongoose')

router.post('/', verifyToken, function (req, res) {
  let data = req.body
  MeterModel.countDocuments({
    name: data.name,
    property: mongoose.Types.ObjectId(req.body.property)
  }).exec(function (err, count) {
    if (!err) {
      if (count > 0) {
        res.status(400).json({
          error: 'Name must be unique for each property'
        })
      } else {
        data.created_by = req.user._id
        new MeterModel(data).save(function (err, created) {
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
  MeterModel.find({
    property: { 
      $in: req.user.properties.map(item=> {return mongoose.Types.ObjectId(item)})
     }
  }).exec(function (err, meters) {
    if (!err && meters) {
      res.status(200).json({
        result: meters
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/', verifyToken, function (req, res) {
  MeterModel.findOne({
    _id: mongoose.Types.ObjectId(req.query.meter)
  }).exec(function (err, meter) {
    if (!err && meter) {
      res.status(200).json({
        result: meter
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.put('/', verifyToken, function (req, res) {
  MeterModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, {
    name: req.body.name,
    rate_per_unit: req.body.rate_per_unit,
    meter_type: req.body.meter_type,
    property: req.body.property
  }, {new: true}).exec(function (err, meter) {
    if (!err && meter) {
      res.status(200).json({
        result: meter
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

module.exports = router;