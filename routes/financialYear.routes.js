const express = require("express");
const router = express.Router();
const financialYearController = require("../controller/financialYear.controller");

// GET /api/financialYear
router.get("/", financialYearController.getAllFinancialYears);

// POST /api/financialYear (Create karne ke liye)
router.post("/", financialYearController.createFinancialYear);

// PUT /api/financialYear/make-active/:id (Active mark karne ke liye)
router.put("/make-active/:id", financialYearController.makeActive);

module.exports = router;