'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,  // Campo obligatorio
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,  // Campo obligatorio
      },
      email: {
        type: Sequelize.STRING,
        unique: true,      // Debe ser único en la base de datos
        validate: {
          isEmail: true,   // Valida que el formato sea de correo electrónico
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
    await queryInterface.dropTable('Users');
  }
};