'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ventas_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_productos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos',
          key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      },
      id_ventas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ventas',
          key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('ventas_productos');
  }
};