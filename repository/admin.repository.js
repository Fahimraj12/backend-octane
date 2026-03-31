const { Op } = require("sequelize");
const Admin = require('../models/Admin');

class adminRepository {
  // GET all admins
  async getAllAdmins() {
    try {
      const admins = await Admin.findAll();
      return {
        status: "success",
        result: admins,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new admin
  async createAdmin(data) {
    try {
      const existingAdmin = await Admin.findOne({
        where: { email: data.email },
      });

      if (existingAdmin) {
        return {
          status: "conflict",
          result: "Admin already exists",
        };
      }

      const newAdmin = await Admin.create(data);

      return {
        status: "success",
        result: "Admin created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Update an admin by ID
  async updateAdmin(id, data) {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return {
          status: "fail",
          result: "Admin not found",
        };
      }

      const updatedAdmin = await admin.update(data);
      return {
        status: "success",
        result: "updatedAdmin updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // DELETE admin
  async deleteAdmin(id) {
    try {
      const admin = await Admin.findByPk(id);
      if (!admin) {
        return {
          status: "fail",
          result: "Admin not found",
        };
      }

      await admin.destroy();
      return {
        status: "success",
        result: "Admin deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
  // LOGIN ke liye admin find karo
  async findAdminForLogin(identifier) {
    try {
      const admin = await Admin.findOne({
        where: {
          [Op.or]: [
            { email: identifier },
            { mobile: identifier }
          ]
        }
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new adminRepository();