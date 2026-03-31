const EquipmentList = require("../models/EquipmentList.js");

class equipmentRepository {
  // GET all equipment
  async getAllEquipment() {
    try {
      const equipment = await EquipmentList.findAll();
      return {
        status: "success",
        result: equipment,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create new equipment
  async createEquipment(data) {
    try {
      const existingEquipment = await EquipmentList.findOne({
        where: { title: data.title },
      });

      if (existingEquipment) {
        return {
          status: "conflict",
          result: "Equipment already exists",
        };
      }

      const newEquipment = await EquipmentList.create(data);

      return {
        status: "success",
        result: newEquipment,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update equipment by ID
  async updateEquipment(id, data) {
    try {
      const equipmentRecord = await EquipmentList.findByPk(id);
      if (!equipmentRecord) {
        return {
          status: "fail",
          result: "Equipment not found",
        };
      }

      await equipmentRecord.update(data);
      return {
        status: "success",
        result: "Success",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Delete equipment by ID
  async deleteEquipment(id) {
    try {
      const equipmentRecord = await EquipmentList.findByPk(id);
      if (!equipmentRecord) {
        return {
          status: "fail",
          result: "Equipment not found",
        };
      }

      await equipmentRecord.destroy();
      return {
        status: "success",
        result: "Equipment deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new equipmentRepository();