'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memmorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here     
      this.hasMany(models.Productions, {foreignKey:"idMemory"});
    
    }
  }
  Memmorys.init({
    name: DataTypes.STRING,   
  }, {
    sequelize,
    modelName: 'Memmorys',
  });
  return Memmorys;
};