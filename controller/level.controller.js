const levelRepository = require("../repository/level.repository.js");

// Get Levels
exports.getLevels = async (req, res) => {
  try {
    const response = await levelRepository.getAllLevels();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Add Level
exports.addLevel = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ status: "fail", message: "Image is required" });
    }

    const { title, description, status } = req.body;
    const levelData = {
      title,
      description,
      status,
      image: req.file.filename,
    };

    const response = await levelRepository.createLevel(levelData);

    res.status(201).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
// Update /levels/:id
exports.updateLevel = async (req, res) => {
  try {

    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      description: req.body.description,
    }
    if(req.file){
      updateData.image = req.file.filename;
    }
    const response = await levelRepository.updateLevel(id, updateData);
if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete /levels/:id
exports.deleteLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await levelRepository.deleteLevel(id);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
