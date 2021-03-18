module.exports = (error, req, res, next) => {
  console.error(error.name)
  if (error.name === 'ValidationError') res.status(400).send({ error: 'validation error' })
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'id used is malformed' })
  } else {
    res.status(500).end()
  }
}
