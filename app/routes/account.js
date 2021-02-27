module.exports = app => {
  const accounts = require('../controllers/account')

  const router = require('express').Router()

  // user login
  router.post('/login', accounts.login)
  // user logout
  router.post('/logout', accounts.logout)
  // refresh token
  router.post('/refreshtoken', accounts.refreshToken)

  app.use('/api/accounts', router)
}
