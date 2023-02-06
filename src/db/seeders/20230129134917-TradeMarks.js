'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Trademarks', [
      {
        name: 'apple',
        logo: "/img/logo/apple.png",
        href: "/apple",
        fileName:"apple.png"
      },
      {
        name: 'samsung',
        logo: "/img/logo/samsung.jpg",
        href: "/samsung",
        fileName:"samsung.jpg"
      },
      {
        name: 'oppop',
        logo: "/img/logo/oppo.png",
        href: "/oppo",
        fileName:"oppo.png"
      },
      {
        name: 'nokia',
        logo: "/img/logo/nokia.jpg",
        href: "/nokia",
        fileName:"nokia.jpg"
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trademarks', null, {});
  }
};
