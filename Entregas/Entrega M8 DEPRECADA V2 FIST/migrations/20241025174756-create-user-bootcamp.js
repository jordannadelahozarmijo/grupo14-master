'use strict';
/** @type {import('sequelize-cli').Migration} */ module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userBootcamps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_bootcamp: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bootcamps',  
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
    await queryInterface.dropTable('userBootcamps');
  }
};