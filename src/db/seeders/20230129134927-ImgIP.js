'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Imgs', [
      //Produc1      
      {
        url: '/img/product/ip14_black_02.jpg',
        idProduction: 1,
        name: "frontside",
        fileName: "ip14_black_02.jpg"
      },
      {
        url: '/img/product/ip14_black_03.jpg',
        idProduction: 1,
        name: "backside",
        fileName: "ip14_black_03.jpg"
      },
      {
        url: '/img/product/ip14_black_04.jpg',
        idProduction: 1,
        name: "camera",
        fileName: "ip14_black_04.jpg"
      },
      {
        url: '/img/product/ip14_black_05.jpg',
        idProduction: 1,
        name: "accessory",
        fileName: "ip14_black_05.jpg"
      },
      //Produc2    
      {
        url: '/img/product/ip14_red_02.jpg',
        idProduction: 2,
        name: "frontside",
        fileName: "ip14_red_02.jpg"
      },
      {
        url: '/img/product/ip14_red_03.jpg',
        idProduction: 2,
        name: "backside",
        fileName: "ip14_red_03.jpg"
      },
      {
        url: '/img/product/red/ip14_red_04.jpg',
        idProduction: 2,
        name: "camera",
        fileName: "ip14_red_04.jpg"
      },
      {
        url: '/img/product/ip14_red_05.jpg',
        idProduction: 2,
        name: "accessory",
        fileName: "ip14_red_05.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Imgs', null, {});
  }
};
