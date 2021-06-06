const express = require('express')
const router = express.Router()

const postController = require('../controllers/PostController')
const handleError = require('../middlewares/handleError')

router.get('/', postController.posts)
router.get('/:id', postController.postForId)
router.get('/all/:id', postController.postsForUserId)
router.post('/', postController.newPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

router.use(handleError)

module.exports = router
