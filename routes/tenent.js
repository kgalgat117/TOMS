var express = require('express');
var router = express.Router();
var UserModel = require('../models/user')
var IncomeModel = require('../models/income')
var ReadingModel = require('../models/reading')

var verifyToken = require('./../controller/middleware').verifyToken

var mongoose = require('mongoose')

router.post('/', verifyToken, function (req, res) {
  let data = req.body
  data.tenent_properties.owner = req.user._id
  data.role = 'tenent'
  new UserModel(data).save(function (err, created) {
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
})

router.get('/all', verifyToken, function (req, res) {
  UserModel.find({
    'tenent_properties':  {
      $elemMatch: {
        owner: mongoose.Types.ObjectId(req.user._id)
      }
    }                   
  }).exec(function (err, tenents) {
    if (!err && tenents) {
      res.status(200).json({
        result: tenents
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/', verifyToken, function (req, res) {
  UserModel.findOne({
    _id: mongoose.Types.ObjectId(req.query.tenent)
  }).exec(function (err, tenent) {
    if (!err && tenent) {
      res.status(200).json({
        result: tenent
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.put('/', verifyToken, function (req, res) {
  UserModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, {
    name: req.body.name,
    'tenent_properties.e_rate_per_unit': req.body.tenent_properties.rate_per_unit,
    'tenent_properties.meter_type': req.body.tenent_properties.meter_type,
    'tenent_properties.monthly_rent': req.body.tenent_properties.monthly_rent,
  }, {
    new: true
  }).exec(function (err, tenent) {
    if (!err && tenent) {
      res.status(200).json({
        result: tenent
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.post('/payment', verifyToken, function (req, res) {
    let data = req.body
    data.owner = req.user._id,
    new IncomeModel(data).save(function(err, created){
        if(!err && created){
            res.status(200).json({result: created})
        }else{
            res.status(400).json({error: err || 'something went wrong'})
        }
    })    
})

router.post('/reading', verifyToken, function (req, res) {
  let data = req.body
  data.owner = req.user._id,
  new ReadingModel(data).save(function(err, created){
      if(!err && created){
          res.status(200).json({result: created})
      }else{
          res.status(400).json({error: err || 'something went wrong'})
      }
  })    
})

router.get('/payments', verifyToken, function(req,res){
    let filter = {}
    if(req.user.role == 'owner'){
        filter.owner = mongoose.Types.ObjectId(req.user._id)
        if(req.query.tenent){
            filter.tenent = mongoose.Types.ObjectId(req.query.tenent)
        }
    }else{
        filter.tenent = mongoose.Types.ObjectId(req.user._id)
    }
    IncomeModel.find(filter).exec(function(err, payments){
        if(!err && payments){
            res.status(200).json({result: payments})
        }else{
            res.status(400).json({error: err || 'something went wrong'})
        }
    })
})

module.exports = router;
