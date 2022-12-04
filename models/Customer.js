"use strict";
const { Model } = require("sequelize");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt-nodejs"));

function hashPassword(customer, options) {
  const SALT_FACTOR = 8;
  if (!customer.changed("password")) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(customer.password, salt, null))
    .then((hash) => {
      customer.setDataValue("password", hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
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
      // cartId : DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  Customer.beforeCreate(hashPassword);
  Customer.beforeUpdate(hashPassword);
  Customer.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password);
  };
  return Customer;
};
