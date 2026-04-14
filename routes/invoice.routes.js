const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoice.controller");

// GET: /api/invoice/
router.get("/", invoiceController.getAllInvoices);
router.get("/:financialyear_id", invoiceController.getInvoices);
module.exports = router;