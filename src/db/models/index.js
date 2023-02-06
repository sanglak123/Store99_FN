'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const Colors = require("./colors");
const Imgs = require("./imgs");
const Memmorys = require("./memmorys");
const Productions = require("./productions");
const Trademarks = require("./trademarks");
const ProductLines = require("./productlines");
const TypePhones = require("./typephones");
const SystemMaintenances = require("./systemmaintenance");
const Orders = require("./orders");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
};

db.Colors = Colors(sequelize, Sequelize);
db.Imgs = Imgs(sequelize, Sequelize);
db.Memmorys = Memmorys(sequelize, Sequelize);
db.Productions = Productions(sequelize, Sequelize);
db.Trademarks = Trademarks(sequelize, Sequelize);
db.ProductLines = ProductLines(sequelize, Sequelize);
db.TypePhones = TypePhones(sequelize, Sequelize);
db.SystemMaintenances = SystemMaintenances(sequelize, Sequelize);
db.Orders = Orders(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
