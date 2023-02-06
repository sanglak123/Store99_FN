'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProduct: {
        type: Sequelize.INTEGER,
        references: {
          model: "Productions",
          key: "id"
        }
      },
      count: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      adress: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Orders');
  }
};