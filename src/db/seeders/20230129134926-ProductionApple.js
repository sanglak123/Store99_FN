'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productions',
      //Ip 14
      [
        {
          idTypePhone: 1, //iPhone14
          idMemory: 2,  //128GB
          idColor: 4, //red
          price: "24990000",
          prepay: 10,
          discount: 10,
          star: 4,
          hot: true,
          count: 156, //Sản phẩm đang có tại cửa hàng
        },
        {
          idTypePhone: 1, //iPhone14
          idMemory: 2,  //128GB
          idColor: 10, //white
          price: "20290000",
          prepay: 10,
          discount: 10,
          star: 4,
          hot: true,
          count: 185, //Sản phẩm đang có tại cửa hàng
        },
        {
          idTypePhone: 1, //iPhone14
          idMemory: 2,  //128GB
          idColor: 9, //black
          price: "20290000",
          prepay: 10,
          discount: 10,
          star: 4,
          hot: true,
          count: 185, //Sản phẩm đang có tại cửa hàng
        },
        {
          idTypePhone: 1, //iPhone14
          idMemory: 2,  //128GB
          idColor: 2, //blue
          price: "20290000",
          prepay: 10,
          discount: 10,
          star: 4,
          hot: true,
          count: 185, //Sản phẩm đang có tại cửa hàng
        },
        {
          idTypePhone: 1, //iPhone14
          idMemory: 2,  //128GB
          idColor: 5, //Purple
          price: "20290000",
          prepay: 10,
          discount: 10,
          star: 4,
          hot: true,
          count: 100, //Sản phẩm đang có tại cửa hàng
        },
      ],
      {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productions', null, {});
  }
};
