const express = require("express");
const router = express.Router();
const packageController = require("../controller/package.controller");
const {uploadLevel}  = require("../middleware/upload.js");

// Create package
router.post("/", uploadLevel.single("image"), packageController.CreatePackage);

// Get all packages
router.get("/", packageController.getPackage);

// Update package
router.put("/:id", uploadLevel.single("image"), packageController.updatePackage);

// Delete package
router.delete("/:id", packageController.deletePackage);

module.exports = router;