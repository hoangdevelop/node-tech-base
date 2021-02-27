'use strict'

const constant = require('../common/constant')

module.exports = (sequelize, Sequelize) => {
  const UsersDepartments = sequelize.define('usersDepartments', {
    userId: Sequelize.INTEGER,
    departmentId: Sequelize.INTEGER,
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: constant.ROLE_MEMBER
    }
  }, {})
  UsersDepartments.associate = function (models) {
    UsersDepartments.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
    UsersDepartments.belongsTo(models.department, { foreignKey: 'departmentId', as: 'department' })
  }
  return UsersDepartments
}
