const express = require("express");
const router = express.Router();
const controller = require("../controller/admin.controller");
const loginController = require("../controller/login.controller");

router.post("/login", loginController.loginAdmin);

router.get("/get-admins", controller.getAllAdmins);
router.post("/add-admin", controller.CreateAdmin);
router.put("/update-admin/:id", controller.updateAdmin);
router.delete("/delete-admin/:id", controller.deleteAdmin);

module.exports = router;