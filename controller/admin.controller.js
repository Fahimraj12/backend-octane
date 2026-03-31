const bcrypt = require("bcrypt");
const adminRepository = require('../repository/admin.repository');
const { generatePassword } = require('../utils/password.util');
const { sendAdminCredentials } = require('../utils/mail.util');
// Create a new admin
exports.CreateAdmin = async (req, res) => {
  try {
    const { name, email, mobile, role, status } = req.body;
    if (!name || !email || !mobile || !role || !status)
      return res
        .status(400)
        .json({ status: "fail", message: "name, email, mobile, role, and status are required" });

    // ✅ Auto-generate password
    const plainPassword = generatePassword(10);
    // hash password before saving (omitted for brevity)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ✅ Save admin
    const response = await adminRepository.createAdmin({
      name,
      email,
      mobile,
      role,
      status,
      password: hashedPassword,
    });

    if (response.status !== "success") {
      return res.status(409).json(response);
    }

    // ✅ Send credentials on email
    await sendAdminCredentials(email, plainPassword);

    res.status(201).json({
      status: "success",
      message: "Admin created & credentials sent to email",
    });

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const response = await adminRepository.getAllAdmins();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT /admin/:id
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await adminRepository.updateAdmin(id, req.body);
    if (!updatedAdmin)
      return res
        .status(404)
        .json({ status: "fail", message: "Admin not found" });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /admin/:id
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await adminRepository.deleteAdmin(id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "fail", message: "Admin not found" });

    res.status(200).json({ status: "success", message: "Admin deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};  