const express = require('express')
const router = express.Router()
const authJwt = require('../middlewares/authJwt')

const testController = require('../controllers/test.controller')

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get('/user', authJwt.verifyToken, testController.userContent)

module.exports = router
