const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    payment_mode: {
      type: DataTypes.ENUM("cash", "upi", "card", "bank"),
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "payments",
    timestamps: false,
  }
);

module.exports = Payment;