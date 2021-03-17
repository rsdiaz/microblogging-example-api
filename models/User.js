const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Post = require('../models/Post')

const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  fullname: String,
  email: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'suscriber'], default: 'suscriber' },
  posts: [{ type: Schema.ObjectId, ref: 'Post', default: null }]
})

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password)
      .then(isMatch => {
        console.log(isMatch)
        if (isMatch) resolve(isMatch)
        else reject(isMatch)
      })
      .catch(err => reject(err))
  })
}

module.exports = mongoose.model('User', UserSchema)
