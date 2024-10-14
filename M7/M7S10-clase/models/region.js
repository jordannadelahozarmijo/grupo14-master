'use strict';
const {
  Model,
  ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Region.hasmMany(models.Provincia,{
        foreignKey: 'regionId',
        as:'provincias',
       })
    }
  }
  Region.init({
    nombre: DataTypes.STRING,
    ordinalidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Region',
    tableName: 'Regiones'
  });
  return Region;
};