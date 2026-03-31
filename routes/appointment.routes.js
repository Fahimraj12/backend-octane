const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointment.controller");

// Add Appointment
router.post("/add-appointment", (req, res) =>
  appointmentController.addAppointment(req, res)
);

// Get booked slots
router.get("/booked-slots", (req, res) =>
  appointmentController.getBookedSlots(req, res)
);

// Get all appointments
router.get("/", (req, res) =>
  appointmentController.getAllAppointments(req, res)
);

module.exports = router;