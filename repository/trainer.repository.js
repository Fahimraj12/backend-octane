const trainer = require("../models/Trainer.js");

class trainerRepository {
  // GET all trainers
  async getAllTrainers() {
    try {
      const trainers = await trainer.findAll();
      return {
        status: "success",
        result: trainers,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new trainer
  async createTrainer(data) {
    try {
      const existingTrainer = await trainer.findOne({
        where: { email: data.email },
      });

      if (existingTrainer) {
        return {
          status: "conflict",
          result: "Trainer already exists",
        };
      }

      const newTrainer = await trainer.create(data);

      return {
        status: "success",
        result: "New trainer created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update a trainer by ID
  async updateTrainer(id, data) {
    try {
      const trainerRecord = await trainer.findByPk(id);
      if (!trainerRecord) {
        return {
          status: "fail",
          result: "Trainer not found",
        };
      }

      await trainerRecord.update(data);
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
  // Delete a trainer by ID
  async deleteTrainer(id) {
    try {
      const trainerRecord = await trainer.findByPk(id);
      if (!trainerRecord) {
        return {
          status: "fail",
          result: "Trainer not found",
        };
      }

      await trainerRecord.destroy();
      return {
        status: "success",
        result: "Trainer deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new trainerRepository();
