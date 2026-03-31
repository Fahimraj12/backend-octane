const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserMembership = sequelize.define(
  "UserMembership",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    membershippackage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "expired"),
      defaultValue: "active",
    },
    start_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    trainer_assigned: {
      type: DataTypes.ENUM("yes", "no"),
      defaultValue: "no",
    },
  },
  {
    tableName: "user_memberships",
    timestamps: true,
  }
);

// ONLY export the model. Let index.js handle the associations.
module.exports = UserMembership;