'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ciudad.belongsTo(models.Provincia,{
        foreignKey: 'provinciaId',
        as: 'provincias'
       })
    }
  }
  Ciudad.init({
    nombre: DataTypes.STRING,
    provinciaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ciudad',
    tableName: 'Ciudades'
  });
  return Ciudad;
};