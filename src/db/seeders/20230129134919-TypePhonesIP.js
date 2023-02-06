'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypePhones', [
      {
        name: 'iPhone 14',
        idProductLine: 1
      },
      {
        name: 'iPhone 14 Plus',
        idProductLine: 1
      },
      {
        name: 'iPhone 14 Pro',
        idProductLine: 1
      },
      {
        name: 'iPhone 14 Pro Max',
        idProductLine: 1
      },
      {
        name: 'iPhone 13',
        idProductLine: 1
      },
      {
        name: 'iPhone 13 Mini',
        idProductLine: 2
      },
      {
        name: 'iPhone 13 Pro',
        idProductLine: 2
      },
      {
        name: 'iPhone 13 Pro Max',
        idProductLine: 2
      },
      {
        name: 'iPhone 12',
        idProductLine: 3
      },
      {
        name: 'iPhone 12 Mini',
        idProductLine: 3
      },
      {
        name: 'iPhone 12 Pro',
        idProductLine: 3
      },
      {
        name: 'iPhone 12 Pro Max',
        idProductLine: 3
      },

    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypePhones', null, {});
  }
};
