const trainerRepository = require("../repository/trainer.repository.js");

// Get Plans
exports.getTrainers = async (req, res) => {
  try {
    const response = await trainerRepository.getAllTrainers();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Add Trainer
exports.addTrainer = async (req, res) => {
  try {
    const { name, email, mobile, dob, gender, status, date_of_joining } = req.body;
    if (!name || !email || !mobile || !dob || !gender || !status || !date_of_joining) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const response = await trainerRepository.createTrainer({
      name,
      email,
      mobile,
      dob,
      gender,
      status,
      date_of_joining
    });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update /trainers/:id
exports.updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await trainerRepository.updateTrainer(id, req.body);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete /trainers/:id
exports.deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await trainerRepository.deleteTrainer(id);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
