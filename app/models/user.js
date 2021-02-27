const constant = require('../common/constant')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    companyId: {
      type: Sequelize.INTEGER
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: constant.ROLE_MEMBER
    }
  })

  User.associate = function (models) {
    User.belongsTo(models.company, {
      foreignKey: 'companyId',
      as: 'company'
    })
    User.hasMany(models.usersDepartments, {
      foreignKey: 'userId',
      as: 'departments'
    })
    User.hasMany(models.usersTeams,
      {
        foreignKey: 'userId',
        as: 'teams'
      }
    )
  }

  return User
}
