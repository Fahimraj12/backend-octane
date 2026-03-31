const express = require("express");
const router = express.Router();
const controller = require("../controller/trainer.controller.js");

router.post("/add-trainers", controller.addTrainer);
router.get("/get-trainers", controller.getTrainers);
router.put("/update-trainer/:id", controller.updateTrainer);
router.delete("/delete-trainer/:id", controller.deleteTrainer);

module.exports = router;
