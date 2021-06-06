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

postController.postForId = (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .then(result => {
      if (result) return res.status(200).json(result)
      res.status(404).send({ error: 'Post not found' })
    })
    .catch(err => {
      next(err)
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

postController.updatePost = (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndUpdate(id, req.body, { new: true })
    .then(result => {
      if (result) return res.status(200).json(result)
      res.status(204).end()
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
}

postController.deletePost = (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndDelete(id)
    .then(result => {
      console.log(result)
      if (!result) res.status(204).end()
      else {
        console.log(result)
        User.findByIdAndUpdate(result.user, { $pull: { posts: result._id } })
          .then(result => {
            res.status(200).send(result)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
}

module.exports = postController
