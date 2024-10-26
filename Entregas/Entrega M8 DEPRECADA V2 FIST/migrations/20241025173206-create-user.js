'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "El Campo del nombre es requerido"
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "El Campo del apellido es requerido"
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "el correo electronico es requerido"
          },
          isEmail: {
            args: true,
            msg: 'Formato de correo invalido'
          }
        },
        unique: {
          args: true,
          msg: 'correo electronico actualmente registrado en la base de datos!'
        }
      },
      password: {
          type: Sequelize.STRING,
          validate: {
            min: 8,
            notEmpty: {
              args: true,
              msg: "El Campo de contraseña es requerido"
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};