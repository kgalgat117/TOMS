var express = require('express');
var router = express.Router();
var UserModel = require('../models/user')

const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')


const saltRounds = 10;
const secretKey = 'Happier';


router.post('/', verifyToken, function (req, res) {
  res.status(200).json({result : req.body})
})

module.exports = router;

async function verifyToken(req, res, next) {
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
    console.log(payload)
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
}