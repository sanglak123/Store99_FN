'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memmorys', [
      {
        name: '1GB',
      },
      {
        name: '4GB',
      },
      {
        name: '8GB',
      },
      {
        name: '64GB',
      },
      {
        name: '128GB',
      },
      {
        name: '256GB',
      },
      {
        name: '512GB ',
      },
      {
        name: '1T',
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memmorys', null, {});
  }
};
