'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypePhones', [
      {
        name: 'OPPO A16K 4G',
        idProductLine: 8
      },
      {
        name: 'OPPO A17K',
        idProductLine: 8
      },
      {
        name: 'OPPO A56 5G',
        idProductLine: 8
      },
      {
        name: 'OPPO A57',
        idProductLine: 8
      },
      {
        name: 'OPPO A77S',
        idProductLine: 8
      },

    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypePhones', null, {});
  }
};
