'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.belongsToMany(models.Bootcamp, { 
          through: 'users_bootcamps', 
          foreignKey: 'id_user',
          otherKey: 'id_bootcamp',
          as: 'bootcamp'
        });
      };
    }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};