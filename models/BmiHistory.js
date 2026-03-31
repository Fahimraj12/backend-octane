const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Apna database connection file ka path yahan check kar lein

const BmiHistory = sequelize.define('BmiHistory', {
  member_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  height: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  weight: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  bmi_score: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.STRING 
  },
  is_free: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  check_date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
});

module.exports = BmiHistory;