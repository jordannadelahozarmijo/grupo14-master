'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bootcamps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,  // Campo obligatorio
      },
      cue: {
        type: Sequelize.INTEGER,
        validate: {
          min: 5,           // Valor mínimo 5
          max: 10,          // Valor máximo 10
          isInt: true,      // Asegura que sea un número entero
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,  // Campo obligatorio
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
    await queryInterface.dropTable('Bootcamps');
  }
};