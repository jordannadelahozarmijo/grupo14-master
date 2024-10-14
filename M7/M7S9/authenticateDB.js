const {
    Sequelize
   } = require('sequelize');
   // Primera forma de autenticarnos
   // const path =
   'postgres://postgres:1234@localhost:5432/M7S9';
   // const sequelize = new Sequelize(path, {
   // operatorsAliases: 0
   // });
   // Segunda forma de autenticarnos
   const sequelize = new Sequelize('M7S9', 'postgres', '1234', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
});
module.exports = sequelize