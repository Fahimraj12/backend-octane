const MemberRepository = require("../repository/member.repository");

// GET /members
exports.getMember = async (req, res) => {
  try {
    const response = await MemberRepository.getAllMembers();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// ✅ UPDATED: GET /members/:id
// ✅ UPDATED: GET /members/:id
exports.getMemberById = async (req, res) => {
    try {
      const { id } = req.params; 
      const response = await MemberRepository.getMemberById(id);
      
      // 👇 YAHAN CHANGE HAI: "fail" ke sath "error" bhi check karna hai
      if (response.status === "fail" || response.status === "error") {
        return res.status(404).json({ status: "FAILED", result: response.result });
      }

      return res.status(200).json({ status: "SUCCESS", result: response.result });
    } catch (error) {
      console.error("Error in getMemberById:", error);
      return res.status(500).json({ status: "FAILED", result: "Internal Server Error" });
    }
  };
// POST /members (Add New Member)
exports.createMember = async (req, res) => {
  try {
    const { name, email, mobile, dob, gender, status, blood_group, student, document_type, document_number } = req.body;
    
    if (!name || !email || !mobile || !dob || !gender || !status || !blood_group || !student) {
      return res.status(400).json({ status: "error", message: "All required fields must be filled" });
    }

    const profileImagePath = req.files && req.files["profile_image"] ? req.files["profile_image"][0].path : null;
    const documentFilePath = req.files && req.files["document_file"] ? req.files["document_file"][0].path : null;

    const response = await MemberRepository.createMember({
      name, email, mobile, dob, gender, status, blood_group, student, 
      document_type, document_number,
      profile_image: profileImagePath, 
      document_file: documentFilePath  
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT /member/:id (Update Member)
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.files && req.files["profile_image"]) {
        updateData.profile_image = req.files["profile_image"][0].path;
    }
    if (req.files && req.files["document_file"]) {
        updateData.document_file = req.files["document_file"][0].path;
    }

    const updatedMember = await MemberRepository.updateMember(id, updateData);
    
    if (!updatedMember) {
      return res.status(404).json({ status: "fail", message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /members/:id
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MemberRepository.deleteMember(id);
    if (!deleted)
      return res.status(404).json({ status: "fail", message: "Member not found" });

    res.status(200).json({ status: "ok", message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
// POST /members/add-bmi
exports.addBmiRecord = async (req, res) => {
  try {
    const { member_id, height, weight } = req.body;
    
    if (!member_id || !height || !weight) {
      return res.status(400).json({ status: "error", message: "Member ID, Height, and Weight are required" });
    }

    const response = await MemberRepository.addBmiRecord(member_id, height, weight);
    
    if (response.status === "error") {
      return res.status(500).json({ status: "FAILED", result: response.result });
    }

    res.status(201).json({ status: "SUCCESS", result: response.result });
  } catch (error) {
    console.error("Error adding BMI:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};