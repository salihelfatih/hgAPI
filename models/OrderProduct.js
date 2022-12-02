"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // orderProduct belongs to order
      OrderProduct.belongsTo(models.Order, {
        foreignKey: "orderId",
        onDelete: "CASCADE",
      });
      models.Order.hasMany(OrderProduct, {
        foreignKey: "orderId",
        as: "orderProducts",
      });
      // orderProduct belongs to product
      OrderProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });

      models.Product.hasOne(OrderProduct, {
        foreignKey: "productId",
        as: "orderProducts",
      });
    }
  }
  OrderProduct.init(
    {
      // orderId: DataTypes.INTEGER,
      // productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderProduct",
    }
  );
  return OrderProduct;
};
