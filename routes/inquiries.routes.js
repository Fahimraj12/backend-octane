const express = require("express");
const router = express.Router();
const inquiriesController = require("../controller/inquiries.controller");

// Create inquiry
router.post("/", inquiriesController.createInquiry);

// Get all inquiries
router.get("/", inquiriesController.getAllInquiries);

// Update inquiry status
router.patch("/:id/status", inquiriesController.updateInquiryStatus);

// Update inquiry
router.put("/:id", inquiriesController.updateInquiry);


module.exports = router;
