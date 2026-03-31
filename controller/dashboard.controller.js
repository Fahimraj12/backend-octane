const { fn, col, Op } = require("sequelize");
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");
const Member = require("../models/Member");
const UserMembership = require("../models/UserMembership");
const Payment = require("../models/Payment");
const MembershipPackage = require("../models/MembershipPackage"); // Import Package

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