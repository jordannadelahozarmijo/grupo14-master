'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersBootcamps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usersBootcamps.init({
    id_user: DataTypes.INTEGER,
    id_bootcamp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersBootcamps',
    tableName: 'users_bootcamps'
  });
  return usersBootcamps;
};