const MembershipPackages = require("../models/MembershipPackage");

class MembershipPackageRepository {
  // Get all membership packages
  async getAllMembershipPackages() {
    try {
      const packages = await MembershipPackages.findAll();
      return {
        status: "success",
        result: packages,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new membership package
  async createMembershipPackage(data) {
    try {
      const newPackage = await MembershipPackages.create(data);
      return {
        status: "success",
        result: "newPackage added successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update a membership package by ID
  async updateMembershipPackage(id, data) {
    try {
      const packageRecord = await MembershipPackages.findByPk(id);
      if (!packageRecord) {
        return {
          status: "fail",
          result: "Membership Package not found",
        };
      }

      await packageRecord.update(data);
      return {
        status: "success",
        result: "packageRecord updated successfully",
      };
    }
    catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Delete a membership package by ID
  async deleteMembershipPackage(id) {
    try {
      const packageRecord = await MembershipPackages.findByPk(id);
      if (!packageRecord) {
        return {
          status: "fail",
          result: "Membership Package not found",
        };
      }

      await packageRecord.destroy();
      return {
        status: "success",
        result: "Membership Package deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new MembershipPackageRepository();