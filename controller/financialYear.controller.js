const FinancialYear = require("../models/FinancialYear");

exports.createFinancialYear = async (req, res) => {
  try {
    const { name, date_start, date_end } = req.body;

    const data = await FinancialYear.create({
      name,
      date_start,
      date_end,
      is_active: true
    });

    res.status(201).json({
      success: true,
      message: "Financial Year Created",
      data: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};