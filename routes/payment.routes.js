const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");

// GET: /api/payment/
router.get("/", paymentController.getAllPayments);

module.exports = router;