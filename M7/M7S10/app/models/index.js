const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
dbConfig.PASSWORD, {
 host: dbConfig.HOST,
 dialect: dbConfig.dialect,
 operatorAliases: false,
 pool: {
 max: dbConfig.max,
 min: dbConfig.min,
 acquire: dbConfig.acquire,
 idle: dbConfig.idle
 }
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./user.model')(sequelize, Sequelize)
db.projects = require('./project.model')(sequelize, Sequelize)
db.users.hasMany(db.projects, {
 as: 'projects'
})
db.projects.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
})
module.exports = db