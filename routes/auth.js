const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')
const verifySingUp = require('../middlewares/verifySignUp')

router.post('/signup', [verifySingUp.checkDuplicateUsernameOrEmail, verifySingUp.checkRole], authController.signup)
router.post('/signin', authController.signing)

module.exports = router
