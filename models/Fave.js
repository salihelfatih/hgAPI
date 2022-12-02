"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // customers have many faves (many to many)
      Fave.belongsTo(models.Customer, {
        foreignKey: "customerId",
      });
      // products have many faves (many to many)
      Fave.belongsTo(models.Product, {
        foreignKey: "productId",
      });

      models.Customer.hasMany(Fave, {
        foreignKey: "customerId",
        as: "faves",
      });

      models.Product.hasMany(Fave, {
        foreignKey: "productId",
        as: "faves",
      });
    }
  }
  Fave.init(
    {
      faveId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      customerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Fave",
    }
  );
  return Fave;
};
