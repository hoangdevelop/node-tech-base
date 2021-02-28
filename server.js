const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const log4js = require('log4js')
log4js.configure({
  appenders: { server: { type: 'file', filename: 'log/file.log' } },
  categories: { default: { appenders: ['server'], level: 'ALL' } }
})

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
db.sequelize.sync()

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

module.exports = app
