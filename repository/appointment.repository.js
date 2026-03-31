const Appointment = require("../models/Appointment")
const Member = require("../models/Member");
const Package = require("../models/Package");

class AppointmentRepository {

  async createAppointment(data) {
    return await Appointment.create(data);
  }

  async getBookedSlotsByDate(date) {
    const appointments = await Appointment.findAll({
      where: { date },
      attributes: ["slot"]
    });

    return appointments.map(a => a.slot);
  }

  async getAllAppointments() {
    return await Appointment.findAll({
      include: [
        {
          model: Member,
          attributes: ["id", "name", "mobile", "email"]
        },
        {
          model: Package,
          attributes: ["id", "title", "mrp_price", "discount_price"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });
  }

}

module.exports = new AppointmentRepository();