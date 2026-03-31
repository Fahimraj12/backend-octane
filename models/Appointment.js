const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Member = require("./Member");
const Package = require("./Package");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    slot: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    payment_status: {
      type: DataTypes.ENUM("pending", "paid"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  }
);

module.exports = Appointment;


Appointment.belongsTo(Member, { foreignKey: "member_id" });
Appointment.belongsTo(Package, { foreignKey: "package_id" });

Member.hasMany(Appointment, { foreignKey: "member_id" });
Package.hasMany(Appointment, { foreignKey: "package_id" });