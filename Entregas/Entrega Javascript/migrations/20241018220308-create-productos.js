'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull:  false,
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      precio: {
        type: Sequelize.INTEGER,
        allowNull:  false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,           // Valor mínimo 5
          max: 1000,          // Valor máximo 10
          isInt: true,      // Asegura que sea un número entero
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};