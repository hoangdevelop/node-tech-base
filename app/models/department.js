module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define('department', {
    departmentId: {
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
    companyId: {
      type: Sequelize.INTEGER
    }
  })

  Department.associate = models => {
    Department.hasMany(models.team, { as: 'teams' })
    Department.belongsTo(models.company, {
      foreignKey: 'companyId',
      as: 'company'
    })
    Department.hasMany(models.usersDepartments, {
      foreignKey: 'departmentId',
      as: 'users'
    })
  }

  return Department
}
