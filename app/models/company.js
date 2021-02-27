module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('company', {
    companyId: {
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
    }
  })
  Company.associate = function (models) {
    Company.hasMany(models.user, { as: 'employes' })
    Company.hasMany(models.department, { as: 'departments' })
  }
  return Company
}
