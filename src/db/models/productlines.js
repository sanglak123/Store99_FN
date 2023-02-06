'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductLines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Trademarks, { foreignKey: "idTradeMark" });
      this.hasMany(models.TypePhones, { foreignKey: "idProductLine" });
    }
  }
  ProductLines.init({
    name: DataTypes.STRING,
    idTradeMark: DataTypes.INTEGER,
    href: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductLines',
  });
  return ProductLines;
};