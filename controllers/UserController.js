const userController = {}

userController.users = (req, res) => {
  res.json({
    users: [
      {
        id: 123,
        name: 'Antonio Guzman',
        phones: {
          home: '800-123-456',
          mobile: '600-123-456'
        },
        email: [
          'wsdsd@example.com',
          'sdsds@example.com'
        ],
        dateOfBirth: Date.now(),
        registered: true
      },
      {
        id: 456,
        name: 'Antonio Alcántara',
        phones: {
          home: '900-123-456',
          mobile: '700-123-456'
        },
        email: [
          'wsdssasd@example.com',
          'sdwqwsds@example.com'
        ],
        dateOfBirth: Date.now(),
        registered: false
      }
    ]
  })
}

userController.user = (req, res) => {
  if (req.params.id === '123') {
    res.json({
      id: 123,
      name: 'Antonio Guzman',
      phones: {
        home: '800-123-456',
        mobile: '600-123-456'
      },
      email: [
        'wsdsd@example.com',
        'sdsds@example.com'
      ],
      dateOfBirth: Date.now(),
      registered: true
    })
  } else {
    res.status(404).send({
      error: '!Sorry, item not found'
    })
  }
}

userController.createUser = (req, res) => {
  const user = req.body
  res.status(200).send(`User ${user.name} created`)
}

userController.updateUser = (req, res) => {
  const user = req.body
  res.status(200).send(`User ${user.name} updated`)
}

userController.deleteUser = (req, res) => {
  res.status(200).send(`User id: ${req.params.id} deleted`)
}

module.exports = userController
