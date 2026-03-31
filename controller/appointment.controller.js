const appointmentRepo = require("../repository/appointment.repository");

class AppointmentController {

  async addAppointment(req, res) {
    try {

      const {
        package_id,
        member_id,
        date,
        slot,
        amount,
        payment_status
      } = req.body;

      // 🔥 Prevent double booking
      const bookedSlots = await appointmentRepo.getBookedSlotsByDate(date);

      if (bookedSlots.includes(slot)) {
        return res.json({
          status: "FAILED",
          result: "This slot is already booked"
        });
      }

      await appointmentRepo.createAppointment({
        package_id,
        member_id,
        date,
        slot,
        amount,
        payment_status
      });

      return res.json({
        status: "SUCCESS",
        result: "Appointment Added Successfully"
      });

    } catch (err) {
      return res.json({
        status: "FAILED",
        result: err.message
      });
    }
  }

  async getBookedSlots(req, res) {
    try {

      const { date } = req.query;

      const slots = await appointmentRepo.getBookedSlotsByDate(date);

      return res.json({
        status: "SUCCESS",
        result: slots
      });

    } catch (err) {
      return res.json({
        status: "FAILED",
        result: err.message
      });
    }
  }

  async getAllAppointments(req, res) {
    try {

      const data = await appointmentRepo.getAllAppointments();

      return res.json({
        status: "SUCCESS",
        result: data
      });

    } catch (err) {
      return res.json({
        status: "FAILED",
        result: err.message
      });
    }
  }
}

module.exports = new AppointmentController();