'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypePhones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ProductLines, { foreignKey: "idProductLine" });

      this.hasMany(models.Productions, { foreignKey: "idTypePhone" });
    }
  }
  TypePhones.init({
    name: DataTypes.STRING,
    idProductLine: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TypePhones',
  });
  return TypePhones;
};