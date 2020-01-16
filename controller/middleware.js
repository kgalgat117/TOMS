var UserModel = require('./../models/user')

const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')

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
    if (req.body.name && req.body.email && req.body.password && req.body.phone && req.body.role) {
      next()
    } else {
      return res.status(400).json({ error: 'Incomplete Data' })
    }
  }

}

module.exports = Middlewares





