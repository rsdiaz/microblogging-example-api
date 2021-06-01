const User = require('../models/User')
const Role = require('../models/Role')

const config = require('../config/auth.config')
const jwt = require('jsonwebtoken')

const authController = {}

authController.signup = (req, res, next) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }
  Role.findOne({ name: 'user' })
    .then(role => {
      newUser.role = role._id
      User.create(newUser)
        .then(() => {
          res.sendStatus(200)
        })
        .catch(err => {
          next(err)
        })
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

authController.signing = (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      error: 'required "username" or "password" field is missing'
    })
  }

  User.findOne({ username })
    .then(userInfo => {
      if (userInfo) {
        userInfo.comparePassword(req.body.password)
          .then(() => {
            const token = jwt.sign({ id: userInfo._id }, config.secret, {
              expiresIn: 86400
            })
            res.status(200).send({ message: 'ok', role: userInfo.role, id: userInfo._id, accessToken: token })
          })
          .catch(() => {
            res.status(404).send({ message: 'Invalid credentials', accessToken: null })
          })
      } else {
        res.status(403).send({ message: 'User not found' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Invalid credentials' })
    })
}

module.exports = authController
