"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // cart belongs to customer
      Cart.belongsTo(models.Customer, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
      models.Customer.hasMany(Cart, {
        foreignKey: "customerId",
        as: "cart",
      });
    }
  }
  Cart.init(
    {
      total: DataTypes.DECIMAL(10, 2),
      // customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
