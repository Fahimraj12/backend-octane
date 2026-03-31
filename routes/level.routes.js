const express = require("express");
const router = express.Router();
const controller = require("../controller/level.controller.js");

const {uploadLevel }  = require("../middleware/upload.js");

router.post(
  "/add-level",
  uploadLevel.single("image"),
  controller.addLevel
);

router.get("/get-levels", controller.getLevels);

router.put(
  "/update-level/:id",
  uploadLevel.single("image"),
  controller.updateLevel
);

router.delete("/delete-level/:id", controller.deleteLevel);

module.exports = router;