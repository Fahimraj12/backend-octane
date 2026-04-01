const express = require("express");
const router = express.Router();
const { getDashboardOverview, backupDatabase } = require("../controller/dashboard.controller");

router.get("/overview", getDashboardOverview);
router.get("/backup", backupDatabase);
module.exports = router;
