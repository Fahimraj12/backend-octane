const { Op } = require("sequelize");
const InvoiceMaster = require("../models/InvoiceMaster");
const Payment = require("../models/Payment");

// 1. Sales Register (All Invoices within a date range)
exports.getSalesRegister = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const invoices = await InvoiceMaster.findAll({
      where: {
        receipt_date: { // 👈 Updated to match your model
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      order: [["receipt_date", "DESC"]],
    });

    // Calculate Totals using your exact column names
    const totals = invoices.reduce((acc, inv) => {
      acc.gross_amount += Number(inv.gross_amount || 0);
      acc.gst_amount += Number(inv.gst_amount || 0);
      acc.net_amount += Number(inv.net_amount || 0);
      return acc;
    }, { gross_amount: 0, gst_amount: 0, net_amount: 0 });

    res.status(200).json({ status: "success", result: invoices, totals });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 2. Cash Report (Only payments where mode is "cash")
exports.getCashReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const payments = await Payment.findAll({
      where: {
        payment_date: { // 👈 Updated to match your model
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
        payment_mode: "cash", 
      },
      order: [["payment_date", "DESC"]],
    });

    const totalCash = payments.reduce((sum, pay) => sum + Number(pay.amount || 0), 0);

    res.status(200).json({ status: "success", result: payments, totalCash });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 3. GST Report (Tax focused breakdown)
exports.getGstReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const invoices = await InvoiceMaster.findAll({
      where: {
        receipt_date: { // 👈 Updated to match your model
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
      order: [["receipt_date", "DESC"]],
    });

    const totals = invoices.reduce((acc, inv) => {
      acc.gross_amount += Number(inv.gross_amount || 0);
      acc.gst_amount += Number(inv.gst_amount || 0);
      acc.net_amount += Number(inv.net_amount || 0);
      return acc;
    }, { gross_amount: 0, gst_amount: 0, net_amount: 0 });

    res.status(200).json({ status: "success", result: invoices, totals });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};