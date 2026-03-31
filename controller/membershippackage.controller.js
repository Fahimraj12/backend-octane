const MembershipPackageRepository = require("../repository/membershipackage.repository");

// GET all membership packages
exports.getAllMembershipPackages = async (req, res) => {
  try {
    const response = await MembershipPackageRepository.getAllMembershipPackages();

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// CREATE membership package
exports.createMembershipPackage = async (req, res) => {
  try {
    const {
      name,
      membership_type,
      duration,
      mrp,
      discount,
      // selling_price hata diya gaya hai
      selling_price,
      status,
      gst_status,        // ✅ Naya Field
      gst_percentage     // ✅ Naya Field
    } = req.body;

    // 1. Basic Field Validation
    if (
      !name ||
      !membership_type ||
      !duration ||
      mrp == null ||
      discount == null ||
      !selling_price ||
      !status ||
      !gst_status
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required (including gst_status)",
      });
    }

    // 2. GST Specific Validation ✅
    if (gst_status === "included" && (gst_percentage == null || gst_percentage === "")) {
      return res.status(400).json({
        status: "fail",
        message: "GST percentage is required when GST is included",
      });
    }

    const response =
      await MembershipPackageRepository.createMembershipPackage({
        name,
        membership_type,
        duration,
        mrp: parseFloat(mrp),
        discount: parseFloat(discount),
        selling_price: parseFloat(selling_price),
        status,
        gst_status,
        gst_percentage: gst_percentage ? parseFloat(gst_percentage) : null,
        // selling_price yahan nahi bhejenge, Sequelize Model hook auto-calculate karega
        createdAt: new Date(),
      });

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// UPDATE membership package
exports.updateMembershipPackage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Yahan bhi validations add kar sakte hain (Optional)
    if (req.body.gst_status === "included" && req.body.gst_percentage == null) {
        return res.status(400).json({
          status: "fail",
          message: "GST percentage is required when GST is included",
        });
    }

    const response = await MembershipPackageRepository.updateMembershipPackage(
      id,
      req.body // Update mein seedha body bhej rahe hain, hook yahan bhi trigger hoga
    );
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// DELETE membership package
exports.deleteMembershipPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MembershipPackageRepository.deleteMembershipPackage(
      id
    );
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};