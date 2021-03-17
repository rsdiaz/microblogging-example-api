require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

const users = require('./routes/users')
const auth = require('./routes/auth')

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res, next) => {
  res.send('Hello World')
})

app.use('/users', users)
app.use('/signin', auth)

app.use((req, res, next) => {
  res.status(404).end()
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
