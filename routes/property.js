var express = require('express');
var router = express.Router();
var PropertyModel = require('../models/property')
var UserModel = require('../models/user')

var verifyToken = require('./../controller/middleware').verifyToken

var mongoose = require('mongoose')
var validator = require('validator').default

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
    select: '_id name tenent_properties'
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
  if (validateMongoDBId(req, 'query', 'property')) {
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
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.put('/', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'body', '_id')) {
    PropertyModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, {
      name: req.body.name,
      category: req.body.category
    }, { new: true, runValidators: true }).exec(function (err, property) {
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
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.post('/tenent', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'body', 'property') && validateMongoDBId(req, 'body', 'tenent')) {
    PropertyModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body.property)
    }, {
      $addToSet: {
        tenent: req.body.tenent
      }
    }, {
      new: true
    }).populate({
      path: 'tenent',
      model: UserModel,
      select: '_id name email'
    }).exec(function (err, updatedProperty) {
      if (!err && updatedProperty) {
        res.status(200).json({ result: updatedProperty })
      } else {
        res.status(400).json({ error: err || 'something went wrong' })
      }
    })
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.delete('/tenent', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'query', 'property') && validateMongoDBId(req, 'query', 'tenent')) {
    PropertyModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.query.property)
    }, {
      $pull: {
        tenent: req.query.tenent
      }
    }, {
      new: true
    }).populate({
      path: 'tenent',
      model: UserModel,
      select: '_id name email'
    }).exec(function (err, updatedProperty) {
      if (!err && updatedProperty) {
        res.status(200).json({ result: updatedProperty })
      } else {
        res.status(400).json({ error: err || 'something went wrong' })
      }
    })
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

module.exports = router;

function validateMongoDBId(request, carrier, field) {
  if (request[carrier][field] && validator.isMongoId(request[carrier][field])) {
    return true
  } else {
    return false
  }
}