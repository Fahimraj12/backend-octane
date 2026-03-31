const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mobile: { type: DataTypes.STRING(15), allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
    blood_group: {
      type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
      allowNull: false,
    },
    student: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: false,
    },
    // Files & Document details
    profile_image: { type: DataTypes.STRING, allowNull: true },
    document_file: { type: DataTypes.STRING, allowNull: true },
    document_type: { 
      type: DataTypes.ENUM('Aadhar', 'PAN', 'Passport', 'Voter ID', 'Other'), 
      allowNull: true 
    },
    document_number: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Members",
    timestamps: false,
  }
);

module.exports = Member;