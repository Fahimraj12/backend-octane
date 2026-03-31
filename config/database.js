// const mysql = require("mysql2");
// require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,      // RDS endpoint
//   user: process.env.DB_USER,      // RDS username
//   password: process.env.DB_PASSWORD, // RDS password
//   database: process.env.DB_NAME,  // DB name
//   port: 3306,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.message);
//     return;
//   }
//   console.log("✅ Database connected successfully");
// });

// module.exports = db;


const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

module.exports = sequelize;
