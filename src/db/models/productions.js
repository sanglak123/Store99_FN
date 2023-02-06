'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TypePhones, { foreignKey: "idTypePhone" });
      this.belongsTo(models.Memmorys, { foreignKey: "idMemory" });
      this.belongsTo(models.Colors, { foreignKey: "idColor" });

      this.hasMany(models.Imgs, { foreignKey: "idProduction" });
      this.hasMany(models.Orders, { foreignKey: "idProduct" });
    }
  }
  Productions.init({
    idTypePhone: DataTypes.INTEGER,
    idMemory: DataTypes.INTEGER,
    idColor: DataTypes.INTEGER,
    price: DataTypes.STRING,
    prepay: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    star: DataTypes.INTEGER,
    hot: DataTypes.BOOLEAN,
    numberOrder: DataTypes.STRING,
    count: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Productions',
  });
  return Productions;
};