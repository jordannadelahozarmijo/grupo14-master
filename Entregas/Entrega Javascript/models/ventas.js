'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ventas.belongsToMany(models.Productos, { 
        through: 'ventas_productos', 
        foreignKey: 'id_ventas',
        otherKey: 'id_productos',
        as: 'productos'
      });
    }
  }
  Ventas.init({
    sku: DataTypes.INTEGER,
    numeroFactura: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ventas',
    tableName:  'ventas'
  });
  return Ventas;
};