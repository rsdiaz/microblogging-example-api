const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const User = require('../models/User')
const Role = require('../models/Role')

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    res.status(403).send({ message: 'No token provided' })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized!' })
    }
    req.userId = decoded.id
    next()
  })
}

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then(result => {
      Role.find({ _id: { $in: result.roles } })
        .then(role => {
          if (role === 'admin') next()
          res.status(403).send({ message: 'Unauthorized' })
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({ message: err })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err })
    })
}

const authJwt = [
  verifyToken,
  isAdmin
]

module.exports = authJwt
