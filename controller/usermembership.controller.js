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

// 1. CREATE USER MEMBERSHIP (WITH INVOICE & INITIAL PAYMENT)
exports.createUserMembership = async (req, res) => {
  const t = await sequelize.transaction(); // Start Transaction

  try {
    const {
      member_id,
      membershippackage_id,
      start_at,
      end_at,
      amount_paying_now, // e.g., 7500
      payment_mode,      // e.g., 'cash', 'upi'
      trainer_assigned,
    } = req.body;

    if (!member_id || !membershippackage_id || !start_at || !end_at) {
      return res.status(400).json({ status: "fail", message: "Required fields missing" });
    }

    // 1. Get Package Details
    const packageData = await MembershipPackage.findByPk(membershippackage_id);
    if (!packageData) {
      return res.status(404).json({ status: "fail", message: "Package not found" });
    }
    
    // ✅ MATH FIX: Calculate GST and Net Amount accurately
    const packagePrice = parseFloat(packageData.selling_price || 0);
    const gstPercentage = parseFloat(packageData.gst_percentage || 0);
    const gstType = packageData.gst_status || "none";
    
    // Calculate the actual GST amount and the final total
    const gstAmount = (packagePrice * gstPercentage) / 100;
    const netAmount = packagePrice + gstAmount;

    const amountPaid = parseFloat(amount_paying_now || 0);

    if (amountPaid > netAmount) {
      return res.status(400).json({ status: "fail", message: "Paid amount exceeds total net price" });
    }

    // 2. Get Active Financial Year
    const activeFY = await FinancialYear.findOne({ where: { is_active: true } });
    if (!activeFY) {
      return res.status(400).json({ status: "fail", message: "Active financial year not found" });
    }

    // 3. Create Membership (Pass Transaction 't')
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

    // 4. Calculate Payment Status
    let paymentStatus = "unpaid";
    if (amountPaid >= netAmount) paymentStatus = "paid"; // Checked against new Net Amount
    else if (amountPaid > 0) paymentStatus = "partial";

    // 5. Create Invoice Master
    const invoiceNo = `INV-${Date.now()}`;
    const newInvoice = await InvoiceMaster.create({
      financialyear_id: activeFY.id,
      usermembership_id: newMembership.id,
      invoice_no: invoiceNo,
      member_id: member_id,
      gross_amount: packagePrice,    // ✅ Saved correct Gross
      gst_amount: gstAmount,         // ✅ Saved correct GST Amount
      gst_percentage: gstPercentage, // ✅ Saved correct Percentage
      gst_type: gstType,             // ✅ Saved correct Type
      net_amount: netAmount,         // ✅ Saved correct Net Amount
      payment_status: paymentStatus,
      receipt_date: new Date(),
    }, { transaction: t });

    // 6. Create Invoice Detail
    await InvoiceDetail.create({
      invoicemaster_id: newInvoice.id,
      usermembership_id: newMembership.id,     
      package_id: membershippackage_id,        
      membershippackage_id: membershippackage_id,
      amount_rate: packagePrice,     // ✅ Updated
      gst_rate: gstPercentage,       // ✅ Updated
      total: netAmount,              // ✅ Updated
    }, { transaction: t });

    // 7. Create Payment Entry (If money is paid)
    if (amountPaid > 0) {
      await Payment.create({
        invoice_id: newInvoice.id,
        payment_date: new Date(),
        payment_mode: payment_mode || "cash",
        amount: amountPaid,
        reference: "Initial Payment",
      }, { transaction: t });
    }

    await t.commit(); // Transaction successful, save data
    res.status(201).json({ status: "success", message: "Membership created!", data: newMembership });

  } catch (error) {
    await t.rollback(); // Error aaya toh undo sab kuch
    console.log("Create Membership Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 2. GET ALL
exports.getAllUserMemberships = async (req, res) => {
  try {
    const response = await UserMembershipRepository.getAllUserMemberships();
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
  console.log("Aaya hua data:", req.body); 
  const t = await sequelize.transaction();
  try {
    const { invoice_id, amount_paying, payment_mode } = req.body;
    console.log("Dhoondhne wali ID:", invoice_id); 

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

    // Add new payment
    await Payment.create({
      invoice_id: invoice.id,
      payment_date: new Date(),
      payment_mode: payment_mode || "cash",
      amount: paymentAmount,
    }, { transaction: t });

    const newTotalPaid = totalPaidAlready + paymentAmount;
    const newStatus = (newTotalPaid >= invoice.net_amount) ? "paid" : "partial";

    await invoice.update({ payment_status: newStatus }, { transaction: t });

    // Update amount_paid in UserMembership
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