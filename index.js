const express = require('express')
const app = express()
const port = 3000

const users = require('./routes/users')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/users', users)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
