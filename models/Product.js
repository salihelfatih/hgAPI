"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Vendor, {
        foreignKey: "vendorId",
        onDelete: "CASCADE",
      });
      models.Vendor.hasMany(Product, {
        foreignKey: "vendorId",
        as: "products",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      vendorId: DataTypes.INTEGER,
      calories: DataTypes.INTEGER,
      fat: DataTypes.INTEGER,
      carbs: DataTypes.INTEGER,
      protein: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
