'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bootcamp.belongsToMany(models.bootcamp, { 
        through: 'userBootcamps', 
        foreignKey: 'id_bootcamp',
        otherKey: 'id_user',
        as: 'user'
      });
    }
  }
  bootcamp.init({
    title: DataTypes.STRING,
    cue: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bootcamp',
    tableName:  'bootcamps'
  });
  return bootcamp;
};