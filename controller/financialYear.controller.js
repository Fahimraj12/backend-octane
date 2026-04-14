const FinancialYear = require("../models/FinancialYear");
const sequelize = require("../config/database"); // Transaction ke liye

// 1. CREATE FINANCIAL YEAR
exports.createFinancialYear = async (req, res) => {
  try {
    const { name, date_start, date_end } = req.body;

    // Data validation
    if (!name || !date_start || !date_end) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const data = await FinancialYear.create({
      name,
      date_start,
      date_end,
      is_active: false // Naya saal by default inactive rakhein, user 'Mark Active' par click karke activate karega
    });

    res.status(201).json({
      success: true,
      message: "Financial Year Created",
      data: data
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. MARK AS ACTIVE
exports.makeActive = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    // Step 1: Pehle database mein jitne bhi saal hain, sabko Inactive (false) kar do
    await FinancialYear.update(
        { is_active: false }, 
        { where: {}, transaction: t }
    );

    // Step 2: Jo ID frontend se aayi hai, sirf usko Active (true) kar do
    const [updatedRows] = await FinancialYear.update(
        { is_active: true }, 
        { where: { id: id }, transaction: t }
    );

    // Agar ID mili hi nahi database mein
    if (updatedRows === 0) {
        await t.rollback();
        return res.status(404).json({ success: false, message: "Financial year not found" });
    }

    await t.commit(); // Sab sahi raha toh save kardo
    res.status(200).json({ success: true, message: "Financial Year marked as Active" });

  } catch (error) {
    await t.rollback(); // Koi error aaya toh purana status wapas le aao
    console.error("Error making active:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// (Aapka getAllFinancialYears function yahan niche rahega...)
exports.getAllFinancialYears = async (req, res) => {
  try {
    const years = await FinancialYear.findAll({
      order: [["date_start", "DESC"]]
    });
    res.status(200).json({ success: true, result: years });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};