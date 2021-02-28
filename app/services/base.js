'use strict'

const models = require('../models/index')

const insert = (model, data, transaction = null) => {
  return model.create(data, {
    transaction
  })
    .then(insertResult => {
      return insertResult
    })
    .catch(error => {
      throw error
    })
}

const bulkInsert = (model, arrayData) => {
  return model.bulkCreate(arrayData)
    .then(insertResult => {
      return insertResult
    })
    .catch(error => {
      throw error
    })
}

const findByCondition = (model, conditions, attributes) => {
  return model
    .findAll({
      attributes,
      where: conditions
    }).then(records => {
      return records
    })
    .catch(error => {
      throw error
    })
}

const getOneByOptions = (model, options) => {
  return model
    .findOne(options).then(records => {
      return records
    })
    .catch(error => {
      throw error
    })
}

const getAllWithFilterAndSort = (model, options) => {
  return model.findAndCountAll(options)
    .then(list => {
      return list
    })
    .catch(reason => {
      throw reason
    })
}

module.exports = {
  insert,
  bulkInsert,
  findByCondition,
  getAllWithFilterAndSort,
  getOneByOptions
}
