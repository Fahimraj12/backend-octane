const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InvoiceMaster = sequelize.define(
  "InvoiceMaster",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    financialyear_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    invoice_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    gross_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    gst_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    gst_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    gst_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    receipt_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    usermembership_id: { // <-- ADD THIS
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    net_amount: { // <-- ADD THIS (Gross + GST)
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_status: { // <-- ADD THIS (Partial track karne ke liye)
      type: DataTypes.ENUM("unpaid", "partial", "paid"),
      defaultValue: "unpaid",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "invoice_masters",
    timestamps: false,
  }
);
// ... aapka upar ka InvoiceMaster model ka code ...

const Payment = require("./Payment"); // Payment model ko import karein
const UserMembership = require("./UserMembership"); // ✅ ADD THIS LINE
// ====== ASSOCIATIONS ====== //
// Ek Invoice ki bahut saari payments ho sakti hain (One-to-Many)
InvoiceMaster.hasMany(Payment, { foreignKey: "invoice_id" });

// ✅ ADD THIS LINE (Har Invoice kisi ek membership ka hota hai)
InvoiceMaster.belongsTo(UserMembership, { foreignKey: "usermembership_id" });

// Har payment kisi ek Invoice se judi hoti hai
Payment.belongsTo(InvoiceMaster, { foreignKey: "invoice_id" });


module.exports = InvoiceMaster;