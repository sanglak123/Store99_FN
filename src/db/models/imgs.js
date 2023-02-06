'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imgs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here     
      this.belongsTo(models.Productions, { foreignKey: "idProduction" });
    }
  }
  Imgs.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    fileName: DataTypes.STRING,
    idProduction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Imgs',
  });
  return Imgs;
};