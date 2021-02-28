'use strict'

const Joi = require('joi')

const getUser = Joi.object({
  page_index: Joi.number().min(1).integer(),
  page_size: Joi.number().min(1).integer(),
  filter: Joi.string().regex(/^[a-zA-Z0-9]$/),
  sort_field: Joi.string(),
  sort_type: Joi.string()
})

module.exports = {
  getUser
}
