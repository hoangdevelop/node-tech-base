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

const update = (model, data, conditions, transaction) => {
  return model.update(data, {
    where: conditions,
    transaction
  })
    .then(updateResult => {
      return updateResult
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

const findAllByOptions = (model, options) => {
  return model
    .findAll(options).then(records => {
      return records
    })
    .catch(error => {
      throw error
    })
}

const getOneByCondition = (model, conditions, attributes) => {
  return model
    .findOne({
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

const selectWithRawQuery = query => {
  return models.sequelize
    .query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    })
}

const deleteByConditions = (model, conditions, transaction) => {
  return model.destroy({
    where: conditions,
    transaction
  })
    .then(rowDeleted => {
      return rowDeleted
    })
    .catch(reason => {
      throw reason
    })
}

const excuteQuery = (rawQuery, queryType, transaction = null) => {
  return models.sequelize
    .query(rawQuery, {
      type: queryType,
      transaction
    })
    .then(records => {
      return records
    })
    .catch(error => {
      throw error
    })
}

module.exports = {
  insert,
  update,
  bulkInsert,
  findByCondition,
  findAllByOptions,
  selectWithRawQuery,
  getAllWithFilterAndSort,
  getOneByCondition,
  deleteByConditions,
  excuteQuery,
  getOneByOptions
}
