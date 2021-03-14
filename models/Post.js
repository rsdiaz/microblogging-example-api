const mongooose = require('mongoose')

const Schema = mongooose.Schema
const User = require('../models/User')

const PostSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  title: String,
  description: String,
  publicationDate: { type: Object, default: Date.now }
})

module.exports = mongooose.model('Post', PostSchema)
