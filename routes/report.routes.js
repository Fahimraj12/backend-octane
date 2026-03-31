const express = require("express");
const router = express.Router();
const controller = require("../controller/report.controller.js");

router.get("/sales-register", controller.getSalesRegister);
router.get("/cash-report", controller.getCashReport);
router.get("/gst-report", controller.getGstReport);

module.exports = router;