const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==========================================
// 1. EXISTING CONFIG: Levels Upload
// ==========================================
const levelStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/levels"; 
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const uploadLevel = multer({
  storage: levelStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ==========================================
// 2. NEW CONFIG: Member Profile & Document Upload
// ==========================================
const memberStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/members/";
    
    // Field ke hisaab se alag folder mein save karna (Optional but recommended)
    if (file.fieldname === "profile_image") {
      uploadPath += "profiles";
    } else if (file.fieldname === "document_file") {
      uploadPath += "documents";
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Fieldname (jaise 'profile_image') file ke naam mein add karna helpful hota hai
    cb(null, file.fieldname + "-" + uniqueName + path.extname(file.originalname));
  },
});

const uploadMember = multer({
  storage: memberStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ==========================================
// Export Both
// ==========================================
module.exports = {
  uploadLevel,
  uploadMember
};