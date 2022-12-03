"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = [
  require("./Cart")(sequelize, Sequelize),
  require("./CartProduct")(sequelize, Sequelize),
  require("./Customer")(sequelize, Sequelize),
  require("./Fave")(sequelize, Sequelize),
  require("./Order")(sequelize, Sequelize),
  require("./OrderProduct")(sequelize, Sequelize),
  require("./Product")(sequelize, Sequelize),
  require("./Recipe")(sequelize, Sequelize),
  require("./Report")(sequelize, Sequelize),
  require("./Review")(sequelize, Sequelize),
  require("./Vendor")(sequelize, Sequelize),
];
models.forEach((model) => {
  db[model.name] = model;
});

models.forEach((model) => {
  if (db[model.name].associate) {
    console.log("associating", model.name);
    db[model.name].associate(db);
  }
});

// models.forEach((model) => {
//   if (model.associate) {
//     model.associate(db);
//   }
// });

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
