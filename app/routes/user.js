module.exports = app => {
  const users = require('../controllers/user')
  const { authenticateJWT } = require('../common/middlewares/authenticate')

  const router = require('express').Router()

  // Retrieve all users
  router.get('/', authenticateJWT, users.getUsersInCompany)

  app.use('/api/users', router)
}
