const User = require('../models/User')
const Post = require('../models/Post')
const postController = {}

postController.posts = (req, res, next) => {
  Post.find().sort('-publicationDate').populate('user')
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

postController.postsForUserId = (req, res, next) => {
  Post.find({ user: req.params.id }).sort('-publicationDate').populate('user')
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      next(err)
    })
}

postController.newPost = (req, res, next) => {
  const { uid } = req.body
  if (uid) {
    User.findById(req.body.uid)
      .then(user => {
        const newPost = new Post({
          user: req.body.uid,
          title: req.body.title,
          description: req.body.description
        })
        user.posts.push(newPost)
        user.save()
          .then(() => {
            newPost.save()
              .then(() => {
                res.sendStatus(200)
              })
              .catch(err => {
                res.status(500).send(err)
              })
          })
          .catch(err => {
            res.status(500).send(err)
          })
      })
      .catch(err => {
        // console.log(err)
        next(err)
      })
  } else {
    next()
  }
}

module.exports = postController
