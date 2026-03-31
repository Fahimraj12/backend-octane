const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InvoiceDetail = sequelize.define(
  "InvoiceDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    invoicemaster_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usermembership_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    membershippackage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    gst_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "invoice_details",
    timestamps: false,
  }
);

module.exports = InvoiceDetail;