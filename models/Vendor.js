"use strict";

const { Model } = require("sequelize");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));

function hashPassword(vendor, options) {
  const SALT_FACTOR = 8;
  if (!vendor.changed("password")) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(vendor.password, salt, null))
    .then((hash) => {
      vendor.setDataValue("password", hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vendor.init(
    {
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      profilePic: DataTypes.STRING,
      kitchenName: DataTypes.STRING,
      kitchenCategory: DataTypes.STRING,
      kitchenDescription: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vendor",
    }
  );

  Vendor.beforeCreate(hashPassword);
  Vendor.beforeUpdate(hashPassword);
  Vendor.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };

  return Vendor;
};
