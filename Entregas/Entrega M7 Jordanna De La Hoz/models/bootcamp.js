'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bootcamp.belongsToMany(models.Bootcamp, { 
        through: 'users_bootcamps', 
        foreignKey: 'id_bootcamp',
        otherKey: 'id_user',
        as: 'user'
      });
    };
    }
  Bootcamp.init({
    title: DataTypes.STRING,
    cue: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bootcamp',
    tableName: 'Bootcamps'
  });
  return Bootcamp;
};