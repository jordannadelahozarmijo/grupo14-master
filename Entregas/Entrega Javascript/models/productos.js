'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Productos.belongsToMany(models.Ventas, { 
        through: 'ventas_productos', 
        foreignKey: 'id_productos',
        otherKey: 'id_ventas',
        as: 'ventas'
      });
    }
  }
  Productos.init({
    nombre: DataTypes.STRING,
    marca: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
    tableName: 'productos'
  });
  return Productos;
};