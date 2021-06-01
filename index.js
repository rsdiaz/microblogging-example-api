require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const users = require('./routes/users')
const posts = require('./routes/post')
const auth = require('./routes/auth')
const test = require('./routes/test.routes')

const notFound = require('./middlewares/notFound')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  res.send('Hello World')
})

app.use('/users', users)
app.use('/', auth)
app.use('/', auth)
app.use('/posts', posts)
app.use('/test', test)

app.use(notFound)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
