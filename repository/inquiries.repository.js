const Inquiries = require("../models/Inquiries");

class InquiriesRepository {
  // GET all inquiries
  async getAllInquiries() {
    try {
      const inquiries = await Inquiries.findAll();
      return {
        status: "success",
        result: inquiries,
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // CREATE inquiry
  async createInquiry(data) {
    try {
      const inquiry = await Inquiries.create(data);
      return {
        status: "success",
        result: "inquiry created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // UPDATE inquiry status
  async updateInquiryStatus(id, status) {
    try {
      const inquiry = await Inquiries.findByPk(id);

      if (!inquiry) {
        return {
          status: "fail",
          result: "Inquiry not found",
        };
      }

      await inquiry.update({ status });

      return {
        status: "success",
        result: "Inquiry status updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // update inquiry 
  async updateInquiry(id, data) {
    try {
      const inquiry = await Inquiries.findByPk(id);
      if (!inquiry) {
        return {
          status: "fail",
          result: "Inquiry not found",
        };
      }

      await inquiry.update(data);

      return {
        status: "success",
        result: "Inquiry updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

}

module.exports = new InquiriesRepository();
