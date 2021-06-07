const User = require('../models/User')

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  const { username } = req.body
  const { email } = req.body

  User.findOne({ username })
    .then((result) => {
      if (result) {
        res.status(400).send({ message: 'Failed! Username is already in use!' })
      } else {
        User.findOne({ email })
          .then(result => {
            result ? res.status(400).send({ message: 'Failed! Email is already in use!' }) : next()
          })
          .catch(err => {
            res.status(500).send({ message: err })
          })
      }
    })
    .catch(err => {
      res.status(500).send({ message: err })
    })
}

const checkRoleExisted = (req, res, next) => {
  const { role } = req.body
  console.log(role)
  next()
}

const verifySingUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted
}

module.exports = verifySingUp
