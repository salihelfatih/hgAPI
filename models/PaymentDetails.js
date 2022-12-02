"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // paymentDetails belongs to order
      PaymentDetails.belongsTo(models.Order, {
        foreignKey: "orderId",
        onDelete: "CASCADE",
      });

      models.Order.hasOne(PaymentDetails, {
        foreignKey: "orderId",
        as: "paymentDetails",
      });
    }
  }
  PaymentDetails.init(
    {
      // orderId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(10, 2),
      paymentMethod: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentDetails",
    }
  );
  return PaymentDetails;
};
