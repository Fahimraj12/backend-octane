// const sequelize = require("../config/database");

// const dropTables = async () => {
//   try {
//     await sequelize.query("DROP TABLE IF EXISTS InvoiceDetail");
//     await sequelize.query("DROP TABLE IF EXISTS Payment");
//     await sequelize.query("DROP TABLE IF EXISTS InvoiceMaster");
//     await sequelize.query("DROP TABLE IF EXISTS FinancialYear");

//     console.log("✅ Tables dropped successfully");

//     process.exit(0);

//   } catch (err) {
//     console.error("❌ Drop error:", err.message);
//     process.exit(1);
//   }
// };

// module.exports = dropTables;