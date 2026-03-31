const Service = require("../models/Service");

class ServiceRepository {
  // GET all services
  async getAllService() {
    try {
      const services = await Service.findAll();
      return {
        status: "success",
        result: services,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // GET service by ID
  async getServiceById(id) {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return {
          status: "fail",
          result: "Service not found",
        };
      }

      return {
        status: "success",
        result: service,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // Create a new Service
  async createService(data) {
    try {
      const existingService = await Service.findOne({
        where: { title: data.title },
      });

      if (existingService) {
        return {
          status: "conflict",
          result: "Service already exists",
        };
      }

      const newService = await Service.create(data);

      return {
        status: "success",
        result: "newService added",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }


  // UPDATE service
  async updateService(id, data) {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return {
          status: "fail",
          result: "Service not found",
        };
      }

      const updatedService = await service.update(data);
      return {
        status: "success",
        result: "Updated Service Successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // DELETE service
  async deleteService(id) {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return {
          status: "fail",
          result: "Service not found",
        };
      }

      await service.destroy();
      return {
        status: "success",
        result: "Service deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }
}

module.exports = new ServiceRepository();
