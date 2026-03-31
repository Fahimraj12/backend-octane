const express = require("express");
const router = express.Router();
const controller = require("../controller/member.controller");
const { uploadMember } = require("../middleware/upload");

// ✅ GET route mein multer ki zaroorat nahi hoti
router.get("/get-member", controller.getMember);
router.post("/add-bmi", controller.addBmiRecord);
// ✅ POST route mein multer yahan lagana hai
router.post("/add-member", uploadMember.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "document_file", maxCount: 1 }
]), controller.createMember);

// PUT route mein theek laga tha
router.put("/update-member/:id", uploadMember.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "document_file", maxCount: 1 }
]), controller.updateMember);

router.delete("/delete-member/:id", controller.deleteMember);
router.get("/get-member/:id", controller.getMemberById);

module.exports = router;