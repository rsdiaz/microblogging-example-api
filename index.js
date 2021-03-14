require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

const users = require('./routes/users')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error(err))

mongoose.set('useCreateIndex', true)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/users', users)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
