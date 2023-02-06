'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypePhones', [
      {
        name: 'Nokia C01 Plus',
        idProductLine: 12
      },
      {
        name: 'Nokia 105 4G',
        idProductLine: 12
      },
      {
        name: 'Nokia 110 4G',
        idProductLine: 12
      },
      {
        name: 'Nokia C01',
        idProductLine: 12
      },
      {
        name: 'Nokia G10',
        idProductLine: 12
      },
      {
        name: 'Nokia C30',
        idProductLine: 12
      },
      {
        name: 'Nokia G21',
        idProductLine: 12
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypePhones', null, {});
  }
};
