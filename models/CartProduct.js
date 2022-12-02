"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // cartProduct belongs to cart
      CartProduct.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
      });
      models.Cart.hasMany(CartProduct, {
        foreignKey: "cartId",
        as: "cartProduct",
      });

      // cartProduct belongs to product
      CartProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
        onDelete: "CASCADE",
      });

      models.Product.hasOne(CartProduct, {
        foreignKey: "productId",
        as: "cartProduct",
      });
    }
  }
  CartProduct.init(
    {
      quantity: DataTypes.INTEGER,
      // cartId: DataTypes.INTEGER,
      // productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartProduct",
    }
  );
  return CartProduct;
};
