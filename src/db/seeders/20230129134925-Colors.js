'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      {
        name: 'Green',
        color: "#008000"
      },
      {
        name: 'Blue',
        color: "#0000FF"
      },
      {
        name: 'Lime',
        color: "#00FF00"
      },
      {
        name: 'Red',
        color: "#FF0000"
      },
      {
        name: 'Purple',
        color: "#800080"
      },
      {
        name: 'Yellow',
        color: "#808000"
      },
      {
        name: 'Gray',
        color: "#808080"
      },
      {
        name: 'Silver',
        color: "#C0C0C0"
      },
      {
        name: 'Black',      
      },
      {
        name: 'White',
        color: "#FFFFFF"
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
