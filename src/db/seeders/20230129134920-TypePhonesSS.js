'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypePhones', [
      {
        name: 'Samsung Galaxy S22 5G',
        idProductLine: 5
      },
      {
        name: 'Samsung Galaxy S22 Plus 5G',
        idProductLine: 5
      },
      {
        name: 'Samsung Galaxy S22 Ultra 5G',
        idProductLine: 5
      },
      {
        name: 'Samsung Galaxy S21 FE 5G',
        idProductLine: 5
      }    
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypePhones', null, {});
  }
};
