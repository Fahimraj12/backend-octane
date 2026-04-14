const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const path = require('path'); // Make sure this is at the top of your file

// const dropTables = require("./config/dropTables");
const adminRouter = require('./routes/admin.routes');
const trainerRouter = require('./routes/trainer.routes');
const memberRouter = require('./routes/member.routes');
const packageRouter = require('./routes/package.routes');
const serviceRouter = require("./routes/service.routes");

const inquiriesRouter = require("./routes/inquiries.routes");
const membershippackageRouter = require("./routes/membershippackage.routes");
const usermembershipRouter = require("./routes/usermembership.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const appointmentRouter = require("./routes/appointment.routes");
const levelRouter = require("./routes/level.routes");
const fitnessRouter = require("./routes/fitness.routes");
const equipmentRouter = require("./routes/equipment.routes");
const financialYearRouter = require("./routes/financialYear.routes");
const invoiceRouter = require("./routes/invoice.routes");
const paymentRouter = require("./routes/payment.routes");
const reportRouter = require("./routes/report.routes");
const startMembershipCron = require('./services/cronJobs'); // Import the cron job
// import models (IMPORTANT)
require("./models/Admin");
require("./models/Trainer");
require("./models/Member");
require('./models/Package');
require("./models/Service");
require("./models/Inquiries");
require("./models/MembershipPackage");
require("./models/UserMembership");
require("./models/Appointment");
require("./models/Level");
require("./models/FitnessGoal");
require("./models/EquipmentList");
require("./models/InvoiceDetail");
require("./models/FinancialYear");
require("./models/InvoiceMaster");
require("./models/Payment");
require("./models/BmiHistory");
// require associations
// require("./associations");
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/downloads', express.static(path.join(__dirname, 'public/downloads'), {
  setHeaders: function (res, path, stat) {
    res.set('Content-Disposition', 'attachment');
  }
}));// model
app.use("/api/admin", adminRouter);
app.use("/api/trainer", trainerRouter);
app.use("/api/member", memberRouter);
app.use("/api/package", packageRouter);
app.use("/api/service", serviceRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/membershippackage", membershippackageRouter);
app.use("/api/usermembership", usermembershipRouter);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/appointment", appointmentRouter);
app.use("/api/level", levelRouter);
app.use("/api/fitness", fitnessRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/financialYear", financialYearRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reports", reportRouter);

// Initialize the cron job
startMembershipCron();
// test route
app.get("/", (req, res) => {
  res.send("Welcome to Gym Management System API");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables created / updated");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // // // use only when you want to drop tables
  // dropTables();
  
})();