'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trademarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here    
      this.hasMany(models.ProductLines, { foreignKey: "idTradeMark" });
    }
  }
  Trademarks.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    href: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trademarks',
  });
  return Trademarks;
};