const serviceRepository = require("../repository/service.repository");
const ServiceRepository = require("../repository/service.repository");

// GET /Service
exports.getService = async (req, res) => {
  try {
    const response = await ServiceRepository.getAllService();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// POST /Service
exports.CreateService = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description || !status)
      return res
        .status(400)
        .json({ status: "fail", message: "title, description and status are required" });
    const newService = await serviceRepository.createService({ title, description, status });
    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    console.error("❌ Error creating service:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT /Service/:id
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await ServiceRepository.updateService(id, req.body);
    if (!updatedService)
      return res
        .status(404)
        .json({ status: "fail", message: "Service not found" });

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /Service/:id
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ServiceRepository.deleteService(id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "fail", message: "Service not found" });

    res
      .status(200)
      .json({ status: "ok", message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
