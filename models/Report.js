"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report.belongsTo(models.Vendor, {
        foreignKey: "vendorId",
        onDelete: "CASCADE",
      });
      models.Vendor.hasMany(Report, {
        foreignKey: "vendorId",
      });
      // define association here
    }
  }
  Report.init(
    {
      reportId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reportName: DataTypes.STRING,
      totalOrders: DataTypes.INTEGER,
      totalFaves: DataTypes.INTEGER,
      recentSales: DataTypes.DECIMAL,
      totalSales: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};
