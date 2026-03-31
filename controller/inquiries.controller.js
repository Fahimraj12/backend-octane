const InquiriesRepository = require("../repository/inquiries.repository");

// GET all inquiries
exports.getAllInquiries = async (req, res) => {
  try {
    const response = await InquiriesRepository.getAllInquiries();

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

// CREATE inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, mobile, Notes, source, convert } = req.body;

    // validation
    if (!name || !email || !mobile || !Notes || !source || !convert) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const response = await InquiriesRepository.createInquiry({
      name,
      email,
      mobile,
      Notes,
      source,
      convert,
      status: "open",
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

// UPDATE inquiry status
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: "fail",
        message: "Status is required",
      });
    }

    const response = await InquiriesRepository.updateInquiryStatus(id, status);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

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


// Update inquiry
exports.updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await InquiriesRepository.updateInquiry(id, req.body);

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
