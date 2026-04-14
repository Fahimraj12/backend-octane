// models/index.js (ya associations wali file)
const Member = require("./Member");
const UserMembership = require("./UserMembership");
const FinancialYear = require("./FinancialYear");
const InvoiceMaster = require("./InvoiceMaster");
const InvoiceDetail = require("./InvoiceDetail");
const Payment = require("./Payment");
const MembershipPackage = require("./MembershipPackage");

// ====== ALL ASSOCIATIONS ====== //

// 1. Member <-> UserMembership
Member.hasMany(UserMembership, { foreignKey: "member_id" });
UserMembership.belongsTo(Member, { foreignKey: "member_id", as: "member" });

// 2. MembershipPackage <-> UserMembership
MembershipPackage.hasMany(UserMembership, { foreignKey: "membershippackage_id" });
UserMembership.belongsTo(MembershipPackage, { foreignKey: "membershippackage_id", as: "membershipPackage" });

// 3. UserMembership <-> InvoiceMaster
UserMembership.hasOne(InvoiceMaster, { foreignKey: "usermembership_id" });
InvoiceMaster.belongsTo(UserMembership, { foreignKey: "usermembership_id" });

// 4. InvoiceMaster <-> InvoiceDetail
InvoiceMaster.hasMany(InvoiceDetail, { foreignKey: "invoicemaster_id" });
InvoiceDetail.belongsTo(InvoiceMaster, { foreignKey: "invoicemaster_id" });

// 5. InvoiceMaster <-> Payment
InvoiceMaster.hasMany(Payment, { foreignKey: "invoice_id" });
Payment.belongsTo(InvoiceMaster, { foreignKey: "invoice_id", as: "invoice" });

// 6. InvoiceMaster <-> FinancialYear (YAHAN ALIAS 'financialYear' LAGANA BOHOT ZAROORI HAI)
InvoiceMaster.belongsTo(FinancialYear, {
  foreignKey: "financialyear_id", // 👈 DB me jo column ka naam hai wahi likho
  as: "financialYear"              // 👈 YEH MISSING THA AAPKE CODE MEIN
});

FinancialYear.hasMany(InvoiceMaster, {
  foreignKey: "financialyear_id", // 👈 Yahan bhi same column ka naam
  as: "invoices"
});

// Exports
module.exports = {
  Member,
  UserMembership,
  FinancialYear,
  InvoiceMaster,
  InvoiceDetail,
  Payment,
  MembershipPackage
};