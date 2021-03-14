const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.get('/', userController.users)
router.get('/:id', userController.user)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
