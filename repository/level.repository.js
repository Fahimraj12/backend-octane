const level = require("../models/Level.js");

class levelRepository {
  // GET all levels
  async getAllLevels() {
    try {
      const levels = await level.findAll();
      return {
        status: "success",
        result: levels,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new level
  async createLevel(data) {
    try {
      const existingLevel = await level.findOne({
        where: { title: data.title },
      });

      if (existingLevel) {
        return {
          status: "conflict",
          result: "Level already exists",
        };
      }

      const newLevel = await level.create(data);

      return {
        status: "success",
        result: newLevel,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update a level by ID
  async updateLevel(id, data) {
    try {
      const levelRecord = await level.findByPk(id);
      if (!levelRecord) {
        return {
          status: "fail",
          result: "Level   not found",
        };
      }

      await levelRecord.update(data);
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
  // Delete a level by ID
  async deleteLevel(id) {
    try {
      const levelRecord = await level.findByPk(id);
      if (!levelRecord) {
        return {
          status: "fail",
          result: "Level not found",
        };
      }

      await levelRecord.destroy();
      return {
        status: "success",
        result: "Level deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new levelRepository();
