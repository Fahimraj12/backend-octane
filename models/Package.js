const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("./Service");

const Package = sequelize.define(
  "Package",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 🔥 Foreign Key
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    duration_in_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    no_of_sessions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    short_description: {
      type: DataTypes.TEXT,
    },

    mrp_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    gst_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },

    image: {
      type: DataTypes.STRING,
    },

    package_includes: {
      type: DataTypes.TEXT,
    },

    appointment_slot_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointment_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    appointment_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    blocked_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    blocked_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    week_days: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "package",
    timestamps: false,
  }
);


// 🔥 ASSOCIATIONS
Package.belongsTo(Service, {
  foreignKey: "service_id",
  as: "service",
});

Service.hasMany(Package, {
  foreignKey: "service_id",
});

module.exports = Package;