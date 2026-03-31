const bcrypt = require("bcrypt");
const adminRepository = require("../repository/admin.repository");

exports.loginAdmin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email/Mobile and password are required"
      });
    }

    // 🔍 Find admin by email OR mobile
    const admin = await adminRepository.findAdminForLogin(identifier);

    if (!admin) {
      return res.status(404).json({
        status: "fail",
        message: "Admin not found"
      });
    }

    // 🔐 Password compare
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
