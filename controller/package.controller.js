const PackageRepository = require("../repository/package.repository");


// =========================
// ✅ GET ALL PACKAGES
// =========================
exports.getPackage = async (req, res) => {
  try {
    const response = await PackageRepository.getAllPackage();

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    const data = response.result.map(pkg => ({
      id: pkg.id,
      service_id: pkg.service_id,
      service: pkg.service ? pkg.service.title : null,
      title: pkg.title,
      duration_in_days: pkg.duration_in_days,
      sessions: pkg.no_of_sessions,
      short_description: pkg.short_description,
      mrp_price: pkg.mrp_price,
      discount_price: pkg.discount_price,
      selling_price: pkg.selling_price,
      gst_percentage: pkg.gst_percentage,
      package_includes: pkg.package_includes,
      appointment_slot_minutes: pkg.appointment_slot_minutes,
      appointment_start: pkg.appointment_start,
      appointment_end: pkg.appointment_end,
      blocked_start: pkg.blocked_start,
      blocked_end: pkg.blocked_end,
      week_days: pkg.week_days,
      image: pkg.image,
      price: pkg.mrp_price,
    }));

    res.status(200).json({
      status: "success",
      result: data,
    });

  } catch (error) {
    console.error("GET PACKAGE ERROR:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



// =========================
// ✅ CREATE PACKAGE
// =========================
exports.CreatePackage = async (req, res) => {
  try {

    let weekDays = [];

    if (req.body.week_days) {
      weekDays =
        typeof req.body.week_days === "string"
          ? JSON.parse(req.body.week_days)
          : req.body.week_days;
    }

    const packageData = {
      service_id: req.body.service_id,   // ✅ important
      title: req.body.title,
      duration_in_days: req.body.duration_in_days,
      no_of_sessions: req.body.no_of_sessions,
      short_description: req.body.short_description,
      mrp_price: req.body.mrp_price,
      discount_price: req.body.discount_price,
      selling_price: req.body.selling_price,
      gst_percentage: req.body.gst_percentage,
      package_includes: req.body.package_includes,
      appointment_slot_minutes: req.body.appointment_slot_minutes,
      appointment_start: req.body.appointment_start,
      appointment_end: req.body.appointment_end,
      blocked_start: req.body.blocked_start,
      blocked_end: req.body.blocked_end,
      week_days: weekDays,
      image: req.file ? req.file.filename : null,
    };

    const response = await PackageRepository.createPackage(packageData);

    res.status(201).json(response);

  } catch (error) {
    console.error("CREATE PACKAGE ERROR:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



// =========================
// ✅ UPDATE PACKAGE
// =========================
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    let weekDays = [];

    if (req.body.week_days) {
      weekDays =
        typeof req.body.week_days === "string"
          ? JSON.parse(req.body.week_days)
          : req.body.week_days;
    }

    const updateData = {
      service_id: req.body.service_id,  // ✅ important
      title: req.body.title,
      duration_in_days: req.body.duration_in_days,
      no_of_sessions: req.body.no_of_sessions,
      short_description: req.body.short_description,
      mrp_price: req.body.mrp_price,
      discount_price: req.body.discount_price,
      selling_price: req.body.selling_price,
      gst_percentage: req.body.gst_percentage,
      package_includes: req.body.package_includes,
      appointment_slot_minutes: req.body.appointment_slot_minutes,
      appointment_start: req.body.appointment_start,
      appointment_end: req.body.appointment_end,
      blocked_start: req.body.blocked_start,
      blocked_end: req.body.blocked_end,
      week_days: weekDays,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const response = await PackageRepository.updatePackage(id, updateData);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("UPDATE PACKAGE ERROR:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};



// =========================
// ✅ DELETE PACKAGE
// =========================
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await PackageRepository.deletePackage(id);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("DELETE PACKAGE ERROR:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};