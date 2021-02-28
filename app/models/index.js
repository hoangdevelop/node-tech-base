//const dbConfig = require("../config/db.config.js");
const config = require('config');

const dbConfig = config.get('dbConfig');

const Sequelize = require("sequelize");

var sequelize;

const Op = Sequelize.Op;
const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  not: Op.not,
  in: Op.in,
  notIn: Op.notIn,
  is: Op.is,
  like: Op.like,
  notLike: Op.notLike,
  iLike: Op.iLike,
  notILike: Op.notILike,
  regexp: Op.regexp,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  between: Op.between,
  notBetween: Op.notBetween,
  overlap: Op.overlap,
  contains: Op.contains,
  contained: Op.contained,
  adjacent: Op.adjacent,
  strictLeft: Op.strictLeft,
  strictRight: Op.strictRight,
  noExtendRight: Op.noExtendRight,
  noExtendLeft: Op.noExtendLeft,
  and: Op.and,
  or: Op.or,
  any: Op.any,
  all: Op.all,
  values: Op.values,
  col: Op.col
};

console.log("process.env.DATABASE_URL:" + process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: true,
    operatorsAliases: operatorsAliases
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.company = require("./company")(sequelize, Sequelize);
db.department = require("./department")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.team = require("./team")(sequelize, Sequelize);
db.usersDepartments = require("./users-departments")(sequelize, Sequelize);
db.usersTeams = require("./users-teams")(sequelize, Sequelize);
db.account = require("./account")(sequelize, Sequelize);

/* Mapping on relationship between each tables */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;