const User = require('../models/User')
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
  User.create(req.body)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      next(err)
    })
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

userController.signing = (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: 'required "username" or "password" field is missing'
    })
  }

  User.findOne({ username })
    .then((userInfo) => {
      console.log(userInfo)
      userInfo.comparePassword(req.body.password)
        .then(() => {
          res.status(200).send({ message: 'ok', role: userInfo.role, id: userInfo._id })
        })
        .catch(() => {
          res.status(404).send({ message: 'Invalid credentials' })
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Invalid credentials' })
    })
}

module.exports = userController
