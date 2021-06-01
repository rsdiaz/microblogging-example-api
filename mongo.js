const mongoose = require('mongoose')
const Role = require('./models/Role')

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Database connection successful')
    initialize()
  })
  .catch((err) => console.error(err))

function initialize () {
  Role.estimatedDocumentCount()
    .then(result => {
      if (result === 0) {
        const user = new Role({ name: 'user' })
        const admin = new Role({ name: 'admin' })
        const moderator = new Role({ name: 'moderator' })
        user.save().then(() => console.log('user role created'))
        admin.save().then(() => console.log('admin role created'))
        moderator.save().then(() => console.log('moderator role created'))
      }
    })
    .catch(err => {
      console.log(err)
    })
}
