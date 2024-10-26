'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userBootcamp.init({
    id_user: DataTypes.INTEGER,
    id_bootcamp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userBootcamp',
    tableName: 'userBootcamp'
  });
  return userBootcamp;
};