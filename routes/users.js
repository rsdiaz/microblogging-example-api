const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const handleError = require('../middlewares/handleError')
const notFound = require('../middlewares/notFound')
const verifySingUp = require('../middlewares/verifySignUp')

router.get('/', userController.users)
router.get('/:id', userController.user)
router.post('/', [verifySingUp.checkDuplicateUsernameOrEmail], userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
// router.post('/', userController.signing)

router.use(notFound)
router.use(handleError)

module.exports = router
