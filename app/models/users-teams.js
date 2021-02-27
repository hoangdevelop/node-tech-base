'use strict'

const constant = require('../common/constant')

module.exports = (sequelize, Sequelize) => {
  const UsersTeams = sequelize.define('usersTeams', {
    userId: Sequelize.INTEGER,
    teamId: Sequelize.INTEGER,
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: constant.ROLE_MEMBER
    }
  }, {})
  UsersTeams.associate = models => {
    UsersTeams.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
    UsersTeams.belongsTo(models.team, { foreignKey: 'teamId', as: 'team' })
  }
  return UsersTeams
}
