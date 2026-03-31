const express = require("express");
const router = express.Router();
const controller = require("../controller/membershippackage.controller.js");

router.post("/add-membershippackage", controller.createMembershipPackage);
router.get("/get-membershippackages", controller.getAllMembershipPackages);
router.put("/update-membershippackages/:id", controller.updateMembershipPackage);
router.delete("/delete-membershippackages/:id", controller.deleteMembershipPackage);

module.exports = router;