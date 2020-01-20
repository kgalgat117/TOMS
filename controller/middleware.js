var UserModel = require('./../models/user')

const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
var validator = require('validator').default

const secretKey = 'Happier';

var Middlewares = {
  verifyToken: async function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
      return res.status(401).send('Unauthorized request')
    }
    let payload = false;
    try {
      payload = jwt.verify(token, secretKey, {
        ignoreExpiration: true
      })
      // console.log(payload)
    } catch (err) {
      payload = false;
      console.log(err)
    }
    if (!payload) {
      return res.status(401).send('Unauthorized request')
    }
    await UserModel.findOne({
      _id: mongoose.Types.ObjectId(payload.user)
    }).then(resp => {
      if (resp) {
        req.user = resp
        next()
      } else {
        return res.status(401).send('Unauthorized request')
      }
    }, err => {
      return res.status(401).send('Unauthorized request')
    })
  },

  validateUserSignUpData: function (req, res, next) {
    if (req.body.name && req.body.email && validator.isEmail(req.body.email) && req.body.password && req.body.phone && validator.isMobilePhone(req.body.phone + "", 'en-IN') && req.body.role && req.body.role == 'owner') {
      next()
    } else {
      return res.status(400).json({ error: 'Incorrect Data' })
    }
  },

  validateUserSignInData: function (req, res, next) {
    if (req.body.email && validator.isEmail(req.body.email) && req.body.password) {
      next()
    } else if (req.body.email && validator.isMobilePhone(req.body.email, 'en-IN') && req.body.password) {
      next()
    } else {
      return res.status(400).json({ error: 'Incorrect Data ' })
    }
  }

}

module.exports = Middlewares





