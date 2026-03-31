const equipmentRepository = require("../repository/equipment.repository.js");

// Get Equipment
exports.getEquipment = async (req, res) => {
  try {
    const response = await equipmentRepository.getAllEquipment();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Add Equipment
exports.addEquipment = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "fail", message: "Image is required" });
    }

    const { title, description, status } = req.body;
    
    if (!title || !description || !status) {
      return res.status(400).json({
        status: "error",
        message: "Title, description, and status are required",
      });
    }

    const equipmentData = {
      title,
      description,
      status,
      image: req.file.filename, // 👈 Grab filename from Multer
    };

    const response = await equipmentRepository.createEquipment(equipmentData);

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update /equipment/:id
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    // If user uploaded a new image, add it to the update object
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const response = await equipmentRepository.updateEquipment(id, updateData);
    
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete /equipment/:id
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await equipmentRepository.deleteEquipment(id);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};