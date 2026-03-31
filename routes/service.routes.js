const express = require("express");
const router = express.Router();
const controller = require("../controller/service.controller");

router.get("/get-service", controller.getService);
router.post("/add-service", controller.CreateService);
router.put("/update-service/:id", controller.updateService);
router.delete("/delete-service/:id", controller.deleteService);

module.exports = router;
