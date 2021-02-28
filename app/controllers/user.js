const { StatusCodes } = require('http-status-codes')
const _ = require('lodash')
const Promise = require('bluebird')

const messageCode = require('../common/message-code')
const config = require('config')
const pagingConfig = config.get('pagingConfig')
const userService = require('../services/user')
const { convertUsersDataAdmin } = require('../dto/user')
const validator = require('./validates/validator')
const { getUser } = require('./validates/schemas/user')
const constant = require('../common/constant')

const getUsersInCompany = (req, res) => {
  validator.validate(req.query, getUser)
    .then(() => {
      const requestUser = req.requestUser
      if (!requestUser.companyId) {
        res.status(StatusCodes.BAD_REQUEST).send(messageCode.responseMessage(messageCode.E002))
      }
      const fieldCanBeSorted = ['userId', 'firstName', 'lastName', 'email', 'role']
      const filter = req.query.filter || ''
      const pageIndex = req.query.page_index ? req.query.page_index : pagingConfig.defaultPageIndex
      const pageSize = req.query.page_size ? req.query.page_size : pagingConfig.defaultPageSize
      if (pageSize > pagingConfig.maxPageSize) {
        res.status(StatusCodes.BAD_REQUEST).send(messageCode.responseMessage(messageCode.E003))
      }

      const sortField = req.query.sort_field === undefined || fieldCanBeSorted.indexOf(req.query.sort_field) === -1 ? 'userId' : req.query.sort_field
      const sortType = req.query.sort_type === undefined || pagingConfig.sortTypeList.indexOf(req.query.sort_type.toUpperCase()) === -1 ? 'DESC' : req.query.sort_type

      if (requestUser.role === constant.ROLE_ADMIN) {
        return userService.getUserInCompany(requestUser.companyId, filter, pageIndex, pageSize, sortField, sortType)
          .then(result => {
            const response = convertUsersDataAdmin(result, pageIndex, pageSize)
            res.send(response)
          })
      } else {
        let departmentsId = []
        let teamsId = []
        const usersId = []
        usersId.push(requestUser.userId)
        departmentsId = _.map(requestUser.departments, item => {
          return item.role === constant.ROLE_ADMIN ? parseInt(item.departmentId) : -1
        })
        teamsId = _.map(requestUser.teams, item => {
          return item.role === constant.ROLE_ADMIN ? parseInt(item.teamId) : -1
        })

        Promise.all([userService.getUserInDepartments(departmentsId), userService.getUserInTeams(teamsId)])
          .then(res => {
            _.each(res, item => {
              _.each(item, user => {
                usersId.push(user.userId)
              })
            })
          })
          .then(() => {
            return userService.getUserInCompany(requestUser.companyId, filter, pageIndex, pageSize, sortField, sortType, usersId)
          })
          .then(result => {
            const response = convertUsersDataAdmin(result, pageIndex, pageSize)
            res.send(response)
          })
      }
    })
    .catch(() => {
      res.status(StatusCodes.BAD_REQUEST).send(messageCode.responseMessage(messageCode.E001))
    })
}

module.exports = {
  getUsersInCompany
}
