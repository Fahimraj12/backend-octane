const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FinancialYear = sequelize.define(
  "FinancialYear",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "financial_years",
    timestamps: false,
  }
);

module.exports = FinancialYear;