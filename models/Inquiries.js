const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inquiries = sequelize.define(
  "Inquiries",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('open', 'closed', 'pending'),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    convert: {
      type: DataTypes.ENUM('Hot', 'Warm', 'Cold'),
      allowNull: false,
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Inquiries", // ✅ correct table
    timestamps: false,
  },
);

module.exports = Inquiries;