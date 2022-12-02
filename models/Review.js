"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });

      models.Product.hasMany(Review, {
        foreignKey: "productId",
      });

      Review.belongsTo(models.Customer, {
        foreignKey: "customerId",
        onDelete: "CASCADE",
      });

      models.Customer.hasMany(Review, {
        foreignKey: "customerId",
      });
    }
  }
  Review.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      review: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
