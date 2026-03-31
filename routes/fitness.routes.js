const express = require("express");
const router = express.Router();
const controller = require("../controller/fitness.controller.js");

router.post("/add-fitness-goal", controller.addFitnessGoal);
router.get("/get-fitness-goals", controller.getFitnessGoals);
router.put("/update-fitness-goal/:id", controller.updateFitnessGoal);
router.delete("/delete-fitness-goal/:id", controller.deleteFitnessGoal);


module.exports = router;
