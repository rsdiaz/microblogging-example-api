const testController = {}

testController.userContent = (req, res) => {
  res.status(200).send('Public content')
}

testController.adminContent = (req, res) => {
  res.status(200).send('Admin content')
}

module.exports = testController
