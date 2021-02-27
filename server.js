const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const log4js = require('log4js')
log4js.configure({
  appenders: { server: { type: 'file', filename: 'log/file.log' } },
  categories: { default: { appenders: ['server'], level: 'ALL' } }
})

const constant = require('./app/common/constant')
const baseServive = require('./app/services/base')

const logger = log4js.getLogger('server')
logger.info('Start server...')

const app = express()

const corsOptions = {
  origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// log all request to log file
app.use(function (req, res, next) {
  logger.info(`Recived a request with method ${req.method} to ${req.originalUrl}`)
  next()
})

// db configuration
const db = require('./app/models')
// db.sequelize.sync()

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

// confige public forder
app.use(express.static('public'))

// add router
require('./app/routes/user')(app)
require('./app/routes/account')(app)

// ignore certicate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

let companyData = {
  title: 'company test 1',
  description: 'this is for test'
}

let departmentData = {
  title: 'department test',
  description: 'this is for test'
}

let departmentData1 = {
  title: 'department test 1',
  description: 'this is for test'
}

let teamData = {
  title: 'team test',
  description: 'this is for test'
}

let teamData1 = {
  title: 'team test 1',
  description: 'this is for test'
}

let userData = {
  firstName: 'test',
  lastName: 'test',
  email: 'test',
  description: 'this is for test',
  role: constant.ROLE_ADMIN
}

let userData1 = {
  firstName: 'test1',
  lastName: 'test1',
  email: 'test1@gmail.com',
  description: 'this is for test'
}

let userData2 = {
  firstName: 'test2',
  lastName: 'test2',
  email: 'test2@gmail.com',
  description: 'this is for test'
}

const accountData = {
  userName: 'admin',
  passWord: 'admin'
}

const accountData1 = {
  userName: 'user',
  passWord: 'user'
}

const accountData2 = {
  userName: 'user1',
  passWord: 'user1',
  isActive: false
}

db.sequelize.sync({ force: true })
  .then(() => {
    return baseServive.insert(db.company, companyData)
  })
  .then((data) => {
    companyData = data
    departmentData.companyId = companyData.companyId
    departmentData1.companyId = companyData.companyId
  })
  .then(() => {
    return baseServive.insert(db.department, departmentData)
  })
  .then((data) => {
    departmentData = data
    return baseServive.insert(db.department, departmentData1)
  })
  .then((data) => {
    departmentData1 = data
    userData.companyId = companyData.companyId
    userData1.companyId = companyData.companyId
    userData2.companyId = companyData.companyId
  })
  .then(() => {
    return baseServive.insert(db.user, userData)
  })
  .then((data) => {
    userData = data
    return baseServive.insert(db.user, userData1)
  })
  .then((data) => {
    userData1 = data
    return baseServive.insert(db.user, userData2)
  })
  .then((data) => {
    userData2 = data
    const usersDepartmentsData = [
      {
        userId: userData.userId,
        departmentId: departmentData.departmentId,
        role: constant.ROLE_ADMIN
      },
      {
        userId: userData1.userId,
        departmentId: departmentData.departmentId,
        role: constant.ROLE_ADMIN
      },
      {
        userId: userData2.userId,
        departmentId: departmentData1.departmentId
      }
    ]
    return baseServive.bulkInsert(db.usersDepartments, usersDepartmentsData)
  })
  .then(() => {
    teamData.departmentId = departmentData.departmentId
    return baseServive.insert(db.team, teamData)
  })
  .then((data) => {
    teamData = data
    teamData1.departmentId = departmentData1.departmentId
    return baseServive.insert(db.team, teamData1)
  })
  .then((data) => {
    teamData1 = data
    const usersteamsData = [
      {
        userId: userData.userId,
        teamId: teamData.teamId,
        role: constant.ROLE_ADMIN
      },
      {
        userId: userData1.userId,
        teamId: teamData.teamId,
        role: constant.ROLE_ADMIN
      },
      {
        userId: userData2.userId,
        teamId: teamData1.teamId
      }
    ]
    return baseServive.bulkInsert(db.usersTeams, usersteamsData)
  })
  .then(() => {
    accountData.userId = userData.userId
    accountData1.userId = userData1.userId
    accountData2.userId = userData2.userId
  })
  .then(() => {
    return baseServive.bulkInsert(db.account, [accountData, accountData1, accountData2])
  })



module.exports = app
