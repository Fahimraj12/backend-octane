const express = require("express");
const router = express.Router();
const controller = require("../controller/equipment.controller.js");
const {uploadLevel} = require("../middleware/upload.js"); // 👈 Import Multer

router.post(
  "/add-equipment",
  uploadLevel.single("image"), // 👈 Added middleware
  controller.addEquipment
);

router.get("/get-equipment", controller.getEquipment);

router.put(
  "/update-equipment/:id",
  uploadLevel.single("image"), // 👈 Added middleware
  controller.updateEquipment
);

router.delete("/delete-equipment/:id", controller.deleteEquipment);

module.exports = router;