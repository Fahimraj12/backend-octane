const Package = require("../models/Package");
const Service = require("../models/Service");

class PackageRepository {

  async getAllPackage() {
    try {
      const pkg = await Package.findAll({
        include: [
          {
            model: Service,
            as: "service",
            attributes: ["id", "title"],
          },
        ],
      });

      return {
        status: "success",
        result: pkg,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  async createPackage(data) {
    try {
      const existingPackage = await Package.findOne({
        where: { title: data.title },
      });

      if (existingPackage) {
        return {
          status: "conflict",
          result: "Package already exists",
        };
      }

      const newPackage = await Package.create(data);

      return {
        status: "success",
        result: newPackage,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  async updatePackage(id, data) {
    try {
      const pkg = await Package.findByPk(id);

      if (!pkg) {
        return {
          status: "fail",
          result: "Package not found",
        };
      }

      const updatedPackage = await pkg.update(data);

      return {
        status: "success",
        result: updatedPackage,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  async deletePackage(id) {
    try {
      const pkg = await Package.findByPk(id);

      if (!pkg) {
        return {
          status: "fail",
          result: "Package not found",
        };
      }

      await pkg.destroy();

      return {
        status: "ok",
        result: "Package deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new PackageRepository();