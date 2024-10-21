'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas_Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ventas_Productos.init({
    id_productos: DataTypes.INTEGER,
    id_ventas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ventas_Productos',
    tableName:  'ventas_productos'
  });
  return Ventas_Productos;
};