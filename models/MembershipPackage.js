const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MembershipPackage = sequelize.define(
  "MembershipPackage",
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
    membership_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    mrp: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    // ✅ NEW FIELD 1: GST Status (include ya exclude)
    gst_status: {
      type: DataTypes.ENUM('included', 'excluded'),
      allowNull: false,
      defaultValue: 'excluded',
    },
    // ✅ NEW FIELD 2: GST Percentage
    gst_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true, // Allow null for 'excluded' condition
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
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
    tableName: "MembershipPackages", 
    timestamps: false,
    hooks: {
      // Step 1: Check karne ke liye ki agar exclude hai toh percentage null ho jaye
      beforeValidate: (package) => {
        if (package.gst_status === 'excluded') {
          package.gst_percentage = null;
        }
      },
      
      // Step 2: Save hone se pehle selling price calculate karna
      beforeSave: (package) => {
        // Base price calculation (Maan lijiye discount amount flat minus ho raha hai)
        // Agar aapka discount percentage mein hai, toh formula: mrp - (mrp * discount / 100) karein.
        let basePrice = parseFloat(package.mrp) - parseFloat(package.discount);

        // Agar GST included hai aur percentage di gayi hai
        if (package.gst_status === 'included' && package.gst_percentage) {
          let gstAmount = (basePrice * parseFloat(package.gst_percentage)) / 100;
          package.selling_price = basePrice + gstAmount;
        } else {
          // Agar GST excluded hai, toh selling_price sirf basePrice hoga
          package.selling_price = basePrice;
        }
      }
    }
  }
);

module.exports = MembershipPackage;