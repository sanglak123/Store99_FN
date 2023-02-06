'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductLines', [
      {
        name: "iPhone 14 | 14 Plus | 14 Pro | 14 Pro Max",
        idTradeMark: 1,
        href: "/ip14"
      },
      {
        name: "iPhone 13 | mini | Pro | Pro Max",
        idTradeMark: 1,
        href: "/ip13"
      },
      {
        name: "iPhone 12 | mini | Pro | Pro Max",
        idTradeMark: 1,
        href: "/ip12"
      },
      {
        name: "iPhone 11 | 11 Pro | 11 Pro Max",
        idTradeMark: 1,
        href: "/ip11"
      },
      //Samsung
      {
        name: "Galaxy S",
        idTradeMark: 2,
        href: "/galaxy_s"
      },
      {
        name: "Galaxy Z",
        idTradeMark: 2,
        href: "/galaxy_z"
      },
      {
        name: "Galaxy A",
        idTradeMark: 2,
        href: "/galaxy_a"
      },
      //Oppo
      {
        name: "OPPO A Series",
        idTradeMark: 3,
        href: "/oppo_a_series"
      },
      {
        name: "OPPO Reno Series",
        idTradeMark: 3,
        href: "/oppo_reno_series"
      },
      {
        name: "OPPO Find X Series",
        idTradeMark: 3,
        href: "/oppo_find_x_series"
      },
      {
        name: "OPPO Find N Series",
        idTradeMark: 3,
        href: "/opp_find_n_series"
      },
      //Nokia
      {
        name: "Nokia",
        idTradeMark: 4,
        href: "/nokia"
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductLines', null, {});
  }
};
