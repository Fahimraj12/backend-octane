const FitnessGoal = require("../models/FitnessGoal.js");

class fitnessRepository {
  // GET all fitness goals
  async getAllFitnessGoals() {
    try {
      const fitnessGoals = await FitnessGoal.findAll();
      return {
        status: "success",
        result: fitnessGoals,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new fitness goal
  async createFitnessGoal(data) {
    try {
      const existingGoal = await FitnessGoal.findOne({
        where: { title: data.title },
      });

      if (existingGoal) {
        return {
          status: "conflict",
          result: "Fitness goal already exists",
        };
      }

      const newGoal = await FitnessGoal.create(data);

      return {
        status: "success",
        result: "New fitness goal created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update a fitness goal by ID
  async updateFitnessGoal(id, data) {
    try {
      const goalRecord = await FitnessGoal.findByPk(id);
      if (!goalRecord) {
        return {
          status: "fail",
          result: "Fitness goal not found",
        };
      }

      await goalRecord.update(data);
      return {
        status: "success",
        result: "Fitness goal updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Delete a fitness goal by ID
  async deleteFitnessGoal(id) {
    try {
      const goalRecord = await FitnessGoal.findByPk(id);
      if (!goalRecord) {
        return {
          status: "fail",
          result: "Fitness goal not found",
        };
      }

      await goalRecord.destroy();
      return {
        status: "success",
        result: "Fitness goal deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new fitnessRepository();
