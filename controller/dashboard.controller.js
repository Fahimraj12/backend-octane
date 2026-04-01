const { fn, col, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const mysqldump = require("mysqldump"); // ✅ NAYA NPM PACKAGE IMPORT KIYA// ✅ IMPORTING ALL YOUR MODELS
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");
const Member = require("../models/Member");
const Package = require("../models/Package");
const Service = require("../models/Service");
const Inquiries = require("../models/Inquiries");
const MembershipPackage = require("../models/MembershipPackage");
const UserMembership = require("../models/UserMembership");
const Appointment = require("../models/Appointment");
const Level = require("../models/Level");
const FitnessGoal = require("../models/FitnessGoal");
const EquipmentList = require("../models/EquipmentList");
const InvoiceDetail = require("../models/InvoiceDetail");
const FinancialYear = require("../models/FinancialYear");
const InvoiceMaster = require("../models/InvoiceMaster");
const Payment = require("../models/Payment");
const BmiHistory = require("../models/BmiHistory");

exports.getDashboardOverview = async (req, res) => {
  try {
    // 1. STAT CARDS DATA
    const totalAdmins = await Admin.count();
    const totalTrainers = await Trainer.count();
    const activeTrainers = await Trainer.count({ where: { status: "Active" } });
    const inactiveTrainers = await Trainer.count({ where: { status: "Inactive" } });

    const totalMembers = await Member.count();
    const activeMemberships = await UserMembership.count({ where: { status: "active" } });

    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);
    const expiringSoon = await UserMembership.count({
      where: { status: "active", end_at: { [Op.between]: [today, next7Days] } },
    });

    const totalRevenue = (await Payment.sum("amount")) || 0;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const todaysRevenue = (await Payment.sum("amount", {
      where: { payment_date: { [Op.between]: [startOfDay, endOfDay] } },
    })) || 0;

    // 2. CHART 1: MONTHLY REVENUE (For Bar Chart)
    const monthlyRevRaw = await Payment.findAll({
      attributes: [
        [fn("MONTH", col("payment_date")), "month"],
        [fn("SUM", col("amount")), "total"],
      ],
      group: [fn("MONTH", col("payment_date"))],
      order: [[fn("MONTH", col("payment_date")), "ASC"]],
    });

    // 3. CHART 2: MONTHLY MEMBER GROWTH (For Line Chart)
    const monthlyMemRaw = await Member.findAll({
      attributes: [
        [fn("MONTH", col("createdAt")), "month"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: [fn("MONTH", col("createdAt"))],
      order: [[fn("MONTH", col("createdAt")), "ASC"]],
    });

    // 4. CHART 3: MEMBERSHIP DISTRIBUTION (For Doughnut Chart)
    const packageDistRaw = await UserMembership.findAll({
      attributes: [
        "membershippackage_id",
        [fn("COUNT", col("UserMembership.id")), "count"]
      ],
      include: [{ model: MembershipPackage, as: "membershipPackage", attributes: ["name"] }],
      group: ["membershippackage_id", "membershipPackage.id", "membershipPackage.name"],
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Format Chart Data
    const monthlyRevenue = monthlyRevRaw.map((m) => ({
      month: monthNames[m.getDataValue("month") - 1] || "N/A",
      total: parseFloat(m.getDataValue("total")),
    }));

    const monthlyMembers = monthlyMemRaw.map((m) => ({
      month: monthNames[m.getDataValue("month") - 1] || "N/A",
      count: parseInt(m.getDataValue("count"), 10),
    }));

    const membershipDistribution = packageDistRaw.map((p) => ({
      name: p.membershipPackage ? p.membershipPackage.name : "Unknown",
      count: parseInt(p.getDataValue("count"), 10),
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalAdmins, totalTrainers, activeTrainers, inactiveTrainers,
        totalMembers, activeMemberships, expiringSoon,
        totalRevenue, todaysRevenue,
        monthlyRevenue, monthlyMembers, membershipDistribution
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({ success: false, message: "Failed to load dashboard data" });
  }
};

// ✅ UPDATED .SQL BACKUP FUNCTION (NO OS DEPENDENCY)
exports.backupDatabase = async (req, res) => {
  try {
    // 1. 'public/downloads' folder create karein (agar nahi hai)
    const dir = path.join(__dirname, "../public/downloads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 2. File ka naam .sql extension ke sath
    const fileName = `Gym_Backup_${Date.now()}.sql`;
    const filePath = path.join(dir, fileName);

    // 3. NPM package ka use karke dump create karna
    // Ye await karega jab tak file puri tarah save nahi ho jati
    await mysqldump({
      connection: {
        host: process.env.DB_HOST || "octanegym.cz4ysoq6wsqb.ap-south-1.rds.amazonaws.com",
        user: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "Fahim_2026",
        database: process.env.DB_NAME || "octanegym",
      },
      dumpToFile: filePath,
    });

    // 4. Frontend ko Download URL bhejein
    const downloadUrl = `${req.protocol}://${req.get("host")}/downloads/${fileName}`;

    return res.status(200).json({
      success: true,
      downloadUrl: downloadUrl,
    });

  } catch (error) {
    console.error("Backup API Error:", error.message);
    res.status(500).json({ 
        success: false, 
        message: "SQL Backup failed to generate.",
        error: error.message 
    });
  }
};