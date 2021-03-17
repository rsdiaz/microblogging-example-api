const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.get('/', userController.users)
router.get('/:id', userController.user)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/', userController.signing)

router.use((error, req, res, next) => {
  console.error(error.name)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'id used is malformed' })
  } else {
    res.status(500).end()
  }
})

module.exports = router
