'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Productions, { foreignKey: "idProduct" })
    }
  }
  Orders.init({
    idProduct: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    key: DataTypes.STRING,
    status: DataTypes.STRING,
    adress: DataTypes.STRING,
    note: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};