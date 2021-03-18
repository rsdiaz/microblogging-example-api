const express = require('express')
const router = express.Router()

const postController = require('../controllers/PostController')
const handleError = require('../middlewares/handleError')

router.get('/', postController.posts)
router.get('/all/:id', postController.postsForUserId)
router.post('/', postController.newPost)

router.use(handleError)

module.exports = router
