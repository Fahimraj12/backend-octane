const UserMembershipRepository = require("../repository/usermembership.repository");
const sequelize = require("../config/database"); // Transaction ke liye zaroori hai
const { Op } = require("sequelize");
const MembershipPackage = require("../models/MembershipPackage");
const FinancialYear = require("../models/FinancialYear");
const InvoiceMaster = require("../models/InvoiceMaster");
const InvoiceDetail = require("../models/InvoiceDetail");
const Payment = require("../models/Payment");
const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");
const mailUtil = require("../utils/mail.util");
// 1. CREATE USER MEMBERSHIP
exports.createUserMembership = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      member_id,
      membershippackage_id,
      start_at,
      end_at,
      amount_paying_now,
      payment_mode,
      trainer_assigned,
      financialyear_id // 👈 Frontend se aayegi
    } = req.body;

    if (!member_id || !membershippackage_id || !start_at || !end_at) {
      return res.status(400).json({ status: "fail", message: "Required fields missing" });
    }

    const packageData = await MembershipPackage.findByPk(membershippackage_id);
    if (!packageData) return res.status(404).json({ status: "fail", message: "Package not found" });

    const packagePrice = parseFloat(packageData.selling_price || 0);
    const gstPercentage = parseFloat(packageData.gst_percentage || 0);
    const gstType = packageData.gst_status || "none";
    const gstAmount = (packagePrice * gstPercentage) / 100;
    const netAmount = packagePrice + gstAmount;
    const amountPaid = parseFloat(amount_paying_now || 0);

    if (amountPaid > netAmount) {
      return res.status(400).json({ status: "fail", message: "Paid amount exceeds total net price" });
    }

    // 👈 FY LOGIC
    let activeFY;
    if (financialyear_id) {
      activeFY = await FinancialYear.findByPk(financialyear_id);
    } else {
      activeFY = await FinancialYear.findOne({ where: { is_active: true } });
    }

    if (!activeFY) return res.status(400).json({ status: "fail", message: "Financial year not found" });

    const membershipReq = await UserMembershipRepository.createUserMembership({
      member_id,
      membershippackage_id,
      status: "active",
      start_at,
      end_at,
      amount_paid: amountPaid,
      trainer_assigned: trainer_assigned || "no",
    }, t);

    const newMembership = membershipReq.result;

    let paymentStatus = "unpaid";
    if (amountPaid >= netAmount) paymentStatus = "paid";
    else if (amountPaid > 0) paymentStatus = "partial";

    // ✅ NAYA LOGIC: Sequential Invoice Number 
    const lastInvoice = await InvoiceMaster.findOne({
      where: { financialyear_id: activeFY.id },
      order: [['id', 'DESC']],
      transaction: t
    });

    let nextInvoiceNo = 1;

    if (lastInvoice && lastInvoice.invoice_no) {
      const lastNumberMatch = lastInvoice.invoice_no.match(/\d+$/);
      if (lastNumberMatch) {
        nextInvoiceNo = parseInt(lastNumberMatch[0], 10) + 1;
      }
    }

    // 👇 YEH LINE HONI CHAHIYE, Date.now() NAHI
    const invoiceNo = `${nextInvoiceNo}`;

    const newInvoice = await InvoiceMaster.create({
      financialyear_id: activeFY.id,
      usermembership_id: newMembership.id,
      invoice_no: invoiceNo, // ✅ Assigned proper sequence number
      member_id: member_id,
      gross_amount: packagePrice,
      gst_amount: gstAmount,
      gst_percentage: gstPercentage,
      gst_type: gstType,
      net_amount: netAmount,
      payment_status: paymentStatus,
      receipt_date: new Date(),
    }, { transaction: t });

    await InvoiceDetail.create({
      invoicemaster_id: newInvoice.id,
      usermembership_id: newMembership.id,
      package_id: membershippackage_id,
      membershippackage_id: membershippackage_id,
      amount_rate: packagePrice,
      gst_rate: gstPercentage,
      total: netAmount,
    }, { transaction: t });

    if (amountPaid > 0) {
      await Payment.create({
        invoice_id: newInvoice.id,
        payment_date: new Date(),
        payment_mode: payment_mode || "cash",
        amount: amountPaid,
        reference: "Initial Payment",
      }, { transaction: t });
    }

    await t.commit();
    // ==========================================
    // 📩 EMAIL LOGIC (WITHOUT PDF)
    // ==========================================
    try {
      const memberDetails = await Member.findByPk(member_id);

      if (memberDetails && memberDetails.email) {
        
        // Utils file wale function ko call karein aur parameters pass karein
        await mailUtil.sendMembershipReceipt(
            memberDetails.email, 
            memberDetails.name, 
            invoiceNo,
            packageData.name,         // Package Name
            start_at.substring(0, 10), // Start Date
            end_at.substring(0, 10),   // End Date
            amountPaid,               // Kitna pay kiya
            payment_mode,
            netAmount              // Kaise pay kiya (Cash/UPI)
        );

        console.log(`✅ Email sent successfully to ${memberDetails.email}`);
      }
    } catch (emailError) {
      console.log("⚠️ Membership created but failed to send email:", emailError.message);
    }
    // ==========================================

    res.status(201).json({ status: "success", message: "Membership created and email sent!", data: newMembership });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 2. GET ALL USER MEMBERSHIPS
exports.getAllUserMemberships = async (req, res) => {
  try {
    const { financialyear_id } = req.query;
    const response = await UserMembershipRepository.getAllUserMemberships(financialyear_id);

    if (response.status !== "success") return res.status(500).json(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 3. GET BY ID
exports.getUserMembershipById = async (req, res) => {
  try {
    const response = await UserMembershipRepository.getUserMembershipById(req.params.id);
    if (response.status === "fail") return res.status(404).json(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 4. ADD PARTIAL/PENDING PAYMENT
exports.addPendingPayment = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { invoice_id, amount_paying, payment_mode } = req.body;

    const invoice = await InvoiceMaster.findByPk(invoice_id, {
      include: [{ model: Payment }]
    });

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const totalPaidAlready = invoice.Payments.reduce((sum, p) => sum + p.amount, 0);
    const outstanding = invoice.net_amount - totalPaidAlready;
    const paymentAmount = parseFloat(amount_paying);

    if (paymentAmount > outstanding) {
      return res.status(400).json({ message: "Amount exceeds outstanding balance" });
    }

    await Payment.create({
      invoice_id: invoice.id,
      payment_date: new Date(),
      payment_mode: payment_mode || "cash",
      amount: paymentAmount,
    }, { transaction: t });

    const newTotalPaid = totalPaidAlready + paymentAmount;
    const newStatus = (newTotalPaid >= invoice.net_amount) ? "paid" : "partial";

    await invoice.update({ payment_status: newStatus }, { transaction: t });

    await UserMembershipRepository.updateUserMembership(
      invoice.usermembership_id,
      { amount_paid: newTotalPaid },
      t
    );

    await t.commit();
    res.status(200).json({ status: "success", message: "Payment added successfully" });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 5. DELETE
exports.deleteUserMembership = async (req, res) => {
  try {
    const response = await UserMembershipRepository.deleteUserMembership(req.params.id);
    if (response.status === "fail") return res.status(404).json(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 6. EXPIRING MEMBERSHIPS
exports.getExpiringMemberships = async (req, res) => {
  try {
    const today = new Date();
    const next29Days = new Date();
    next29Days.setDate(today.getDate() + 29);

    const memberships = await UserMembership.findAll({
      where: {
        status: "active",
        end_at: { [Op.between]: [today, next29Days] },
      },
      include: [
        { model: Member, as: "member", attributes: ["id", "name", "email", "mobile"] },
        {
          model: MembershipPackage,
          as: "membershipPackage",
          attributes: ["id", "name", "selling_price", "mrp", "gst_status", "gst_percentage"]
        },],
      order: [["end_at", "ASC"]],
    });

    res.status(200).json({ status: "success", data: memberships });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};