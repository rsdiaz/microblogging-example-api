const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Post = require('../models/Post')

const bcrypt = require('bcryptjs')
const SALT_WORK_FACTION = 10

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  fullname: String,
  email: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'suscriber'], default: 'suscriber' },
  posts: [{ type: Schema.ObjectId, ref: 'Post', default: null }]
})

UserSchema.pre('save', (next) => {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTION, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.method.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
