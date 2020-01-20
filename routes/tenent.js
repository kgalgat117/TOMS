var express = require('express');
var router = express.Router();
var UserModel = require('../models/user')
var IncomeModel = require('../models/income')
var ReadingModel = require('../models/reading')

var verifyToken = require('./../controller/middleware').verifyToken

var mongoose = require('mongoose')
var validator = require('validator').default

router.post('/', verifyToken, function (req, res) {
  let data = req.body
  if (!data.tenent_properties) {
    data.tenent_properties = {}
  }
  data.tenent_properties.owner = req.user._id
  data.role = 'tenent'
  data.created_by = req.user._id
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
    'created_by': mongoose.Types.ObjectId(req.user._id)
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
  if (validateMongoDBId(req, 'query', 'tenent')) {
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
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.put('/', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'body', '_id') && req.body.email && validator.isEmail(req.body.email) && req.body.phone && validator.isMobilePhone(req.body.phone + "", 'en-IN')) {
    if (!req.body.permanent_address) {
      req.body.permanent_address = {}
    }
    UserModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      'tenent_properties.e_rate_per_unit': req.body.tenent_properties.rate_per_unit,
      'tenent_properties.meter_type': req.body.tenent_properties.meter_type,
      'tenent_properties.monthly_rent': req.body.tenent_properties.monthly_rent,
      'tenent_properties.tenure_start': req.body.tenent_properties.tenure_start,
      'tenent_properties.tenure_end': req.body.tenent_properties.tenure_end,
      'tenent_properties.security_deposit': req.body.tenent_properties.security_deposit,
      'permanent_address.address1': req.body.permanent_address.address1,
      'permanent_address.address2': req.body.permanent_address.address2,
      'permanent_address.state': req.body.permanent_address.state,
      'permanent_address.city': req.body.permanent_address.city,
      'permanent_address.country': req.body.permanent_address.country,
      'permanent_address.pincode': req.body.permanent_address.pincode,
    }, {
      new: true, runValidators: true
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
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.post('/payment', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'body', 'tenent')) {
    let data = req.body
    data.owner = req.user._id,
      new IncomeModel(data).save(function (err, created) {
        if (!err && created) {
          res.status(200).json({ result: created })
        } else {
          res.status(400).json({ error: err || 'something went wrong' })
        }
      })
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.put('/payment', verifyToken, function (req, res) {
  if (validateMongoDBId(req, 'body', '_id')) {
    let data = req.body
    IncomeModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(data._id)
    }, {
      paid_on: data.paid_on,
      amount: data.amount,
      remarks: data.remarks
    }, { new: true }).populate({
      path: 'tenent',
      model: UserModel,
      select: '_id name'
    }).exec(function (err, updated) {
      if (!err && updated) {
        res.status(200).json({ result: updated })
      } else {
        res.status(400).json({ error: err || 'something went wrong' })
      }
    })
  } else {
    res.status(400).json({ error: 'incorrect data' })
  }
})

router.delete('/payment', verifyToken, function (req, res) {
  let data = req.query
  IncomeModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(data._id)
  }, {
    $push: {
      invisibility_array: req.user._id
    }
  }).exec(function (err, updated) {
    if (!err && updated) {
      res.status(200).json({ result: updated })
    } else {
      res.status(400).json({ error: err || 'something went wrong' })
    }
  })
})

router.get('/payments', verifyToken, function (req, res) {
  let filter = {
    invisibility_array: {
      $nin: [mongoose.Types.ObjectId(req.user._id)]
    }
  }
  if (req.user.role == 'owner') {
    filter.owner = mongoose.Types.ObjectId(req.user._id)
    if (req.query.tenent) {
      filter.tenent = mongoose.Types.ObjectId(req.query.tenent)
    }
  } else {
    filter.tenent = mongoose.Types.ObjectId(req.user._id)
  }
  IncomeModel.find(filter).populate({
    path: 'tenent',
    model: UserModel,
    select: '_id name phone'
  }).sort({ paid_on: -1 }).exec(function (err, payments) {
    if (!err && payments) {
      res.status(200).json({ result: payments })
    } else {
      res.status(400).json({ error: err || 'something went wrong' })
    }
  })
})

router.post('/reading', verifyToken, function (req, res) {
  let data = req.body
  data.owner = req.user._id,
    new ReadingModel(data).save(function (err, created) {
      if (!err && created) {
        res.status(200).json({ result: created })
      } else {
        res.status(400).json({ error: err || 'something went wrong' })
      }
    })
})

module.exports = router;

function validateMongoDBId(request, carrier, field) {
  if (request[carrier][field] && validator.isMongoId(request[carrier][field])) {
    return true
  } else {
    return false
  }
}
