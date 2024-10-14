const Sequelize = require('sequelize');
const db = require('./authenticateDB');
// Creación de la tabla user
const User = db.define('users', {
 // propiedades del objeto User
 id: {
 type: Sequelize.INTEGER,
 primaryKey: true,
 autoIncrement: true
 },
 name: {
 type: Sequelize.STRING,
 allowNull: false
 },
 age: {
 type: Sequelize.INTEGER,
 allowNull: false
 }
});
module.exports = User