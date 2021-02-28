'use strict'

const models = require('../models/index')
const baseService = require('./base')

const getUserInCompany = (companyId, filter, pageIndex, pageSize, sortField, sortType, users) => {
  const options = {
    attributes: ['userId', 'firstName', 'lastName', 'email', 'role'],
    include: [
      {
        model: models.usersDepartments,
        as: 'departments',
        attributes: ['departmentId', 'role'],
        include: {
          model: models.department,
          as: 'department',
          attributes: ['title']
        }
      },
      {
        model: models.usersTeams,
        as: 'teams',
        attributes: ['teamId', 'role'],
        include: {
          model: models.team,
          as: 'team',
          attributes: ['title']
        }
      }
    ],
    where: {
      companyId: companyId,
      or: [{
        firstName: { like: `%${filter}%` }
      }, {
        lastName: { like: `%${filter}%` }
      }, {
        email: { like: `%${filter}%` }
      }]
    },

    limit: pageSize,
    offset: pageSize * (pageIndex - 1),
    order: [[sortField, sortType]]
  }

  if (users) {
    options.where.userId = {
      in: users
    }
  }

  return baseService.getAllWithFilterAndSort(models.user, options)
}

const getUserByAccount = (userName, passWord) => {
  const options = {
    attributes: ['userId', 'userName'],
    where: {
      userName: userName,
      passWord: passWord,
      isActive: true
    }
  }
  return baseService.getOneByOptions(models.account, options)
}

const getUserById = (userId) => {
  const options = {
    attributes: ['userId', 'role', 'companyId'],
    include: [
      {
        model: models.usersDepartments,
        as: 'departments',
        attributes: ['departmentId', 'role']
      },
      {
        model: models.usersTeams,
        as: 'teams',
        attributes: ['teamId', 'role']
      }
    ],
    where: {
      userId: userId
    }
  }
  return baseService.getOneByOptions(models.user, options)
}

const getUserInDepartments = departments => {
  const attributes = ['userId']
  const conditions = {
    departmentId: {
      in: [...departments]
    }
  }
  return baseService.findByCondition(models.usersDepartments, conditions, attributes)
}

const getUserInTeams = teams => {
  const attributes = ['userId']
  const conditions = {
    teamId: {
      in: [...teams]
    }
  }

  return baseService.findByCondition(models.usersTeams, conditions, attributes)
}
module.exports = {
  getUserInCompany,
  getUserByAccount,
  getUserById,
  getUserInDepartments,
  getUserInTeams
}
