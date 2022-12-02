"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // order belongs to customer
      Order.belongsTo(models.Customer, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });
      models.Customer.hasMany(Order, {
        foreignKey: "customerId",
        as: "orders",
      });
    }
  }
  Order.init(
    {
      // paymentId: DataTypes.INTEGER,
      // customerId: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      deliveryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
