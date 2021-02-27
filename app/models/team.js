module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    teamId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    departmentId: {
      type: Sequelize.INTEGER
    }
  })

  Team.associate = function (models) {
    Team.belongsTo(models.department, { foreignKey: 'companyId', as: 'department' })
    Team.hasMany(models.usersDepartments, {
      foreignKey: 'teamId',
      as: 'users'
    })
  }

  return Team
}
