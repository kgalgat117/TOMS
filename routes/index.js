var express = require('express');
var router = express.Router();
var JobModel = require('../models/jobs')
var UserModel = require('../models/user')



const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')


const saltRounds = 10;
const secretKey = 'Happier';


router.get('/job', verifyToken, function (req, res) {
  let filter = {}
  let populate = {}
  if (req.user.role == 'recruiter') {
    filter = {
      creator: mongoose.Types.ObjectId(req.user._id)
    }
    populate = {
      path: 'appliedUsers',
      model: UserModel,
      select: '_id name'
    }
  } else {
    populate = ''
  }
  JobModel.find(filter).populate(populate).sort({
    created_on: -1
  }).exec(function (err, jobs) {
    if (!err && jobs) {
      let response_object = {
        result: jobs
      }
      if (req.user.role == 'student') {
        response_object.user = {
          _id: req.user._id,
          name: req.user.name
        }
      }
      res.status(200).json(response_object)
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/job/apply', verifyToken, function (req, res) {
  if (req.user.role == 'student') {
    JobModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.query.job)
    }, {
      $push: {
        appliedUsers: req.user._id
      }
    }, {
      new: true
    }).exec(function (err, updatedJob) {
      if (!err && updatedJob) {
        UserModel.findOneAndUpdate({
          _id: mongoose.Types.ObjectId(req.user._id)
        }, {
          $push: {
            appliedJobs: updatedJob._id
          }
        }, {
          new: true
        }).exec(function (err, updatedUser) {
          if (!err && updatedUser) {
            res.status(200).json({
              result: updatedJob
            })
          } else {
            res.status(400).json({
              error: err || 'something went wrong'
            })
          }
        })
      }
    })
  } else {
    res.status(400).json({
      error: 'recruiters cannot apply on job'
    })
  }
})

router.post('/job', verifyToken, function (req, res) {
  let data = {
    title: req.body.title,
    description: req.body.description,
    skills: req.body.skills,
    creator: req.user._id
  }
  let dataUpdate = new JobModel(data)
  dataUpdate.save(function (err, createdJob) {
    if (!err && createdJob) {
      res.status(200).send(createdJob)
    } else {
      res.status(400).send(err || {
        error: 'something went wrong'
      })
    }
  })
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