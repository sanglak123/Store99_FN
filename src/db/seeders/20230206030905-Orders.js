'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        idProduct: 1,
        count: 1,
        email: "user1@gmail.com",
        phone: "0123456789",
        key: "XXL01",
        status: "Pending"
      },
      {
        idProduct: 2,
        count: 1,
        email: "user1@gmail.com",
        phone: "0123456789",
        key: "XXL01",
        status: "Pending"
      },
      {
        idProduct: 4,
        count: 2,
        email: "user1@gmail.com",
        phone: "0123456789",
        key: "XXL01",
        status: "Pending"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};