const express = require("express");
const router = express.Router();
const financialController = require("../controller/financialYear.controller");

router.post("/financial-year", financialController.createFinancialYear);

module.exports = router;