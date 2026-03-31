const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoice.controller");

// GET: /api/invoice/
router.get("/", invoiceController.getAllInvoices);

module.exports = router;