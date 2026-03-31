const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FitnessGoal = sequelize.define(
  "FitnessGoal",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "FitnessGoal", // ✅ correct table
    timestamps: false,
  },
);

module.exports = FitnessGoal;