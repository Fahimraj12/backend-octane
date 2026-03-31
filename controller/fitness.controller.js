const fitnessRepository = require("../repository/fitness.repository.js");

// Get Fitness Goals
exports.getFitnessGoals = async (req, res) => {
  try {
    const response = await fitnessRepository.getAllFitnessGoals();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Add Fitness Goal
exports.addFitnessGoal = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const response = await fitnessRepository.createFitnessGoal({
      title,
      description,
      status,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update /fitness/:id
exports.updateFitnessGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fitnessRepository.updateFitnessGoal(id, req.body);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete /fitness/:id
exports.deleteFitnessGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fitnessRepository.deleteFitnessGoal(id);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
