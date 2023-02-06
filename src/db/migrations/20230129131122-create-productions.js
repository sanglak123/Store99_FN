'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTypePhone: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypePhones",
          key: "id"
        }
      },
      idMemory: {
        type: Sequelize.INTEGER,
        references: {
          model: "Memmorys",
          key: "id"
        }
      },
      idColor: {
        type: Sequelize.INTEGER,
        references: {
          model: "Colors",
          key: "id"
        }
      },
      price: {
        type: Sequelize.STRING
      },
      prepay: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      star: {
        type: Sequelize.INTEGER
      },
      hot: {
        type: Sequelize.BOOLEAN
      },
      numberOrder: {
        type: Sequelize.STRING
      },
      count: {
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
    await queryInterface.dropTable('Productions');
  }
};