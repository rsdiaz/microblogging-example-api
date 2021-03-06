const User = require('../models/User')
const Role = require('../models/Role')
const userController = {}

userController.users = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

userController.user = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) return res.status(200).json(user)
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
}

userController.createUser = (req, res, next) => {
  const { username, email, password, role } = req.body
  const user = new User({
    username,
    email,
    password
  })
  user.save()
    .then(user => {
      console.log(user)
      res.sendStatus(200)
    })
/*   User.create(user)
    .then(user => {
      Role.find({ name: { $in: role } })
      console.log(user)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err.name)
      next(err)
    }) */
}

userController.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      if (result) return res.status(200).json(result)
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
}

userController.deleteUser = (req, res, next) => {
  const { id } = req.params
  User.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
}

module.exports = userController
