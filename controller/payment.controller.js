const Payment = require("../models/Payment");
const InvoiceMaster = require("../models/InvoiceMaster");
const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");

exports.getAllPayments = async (req, res) => {
  try {
    const { financialyear_id } = req.query; // Query params se FY ID

    const payments = await Payment.findAll({
      include: [
        {
          model: InvoiceMaster,
          where: financialyear_id ? { financialyear_id: financialyear_id } : {}, 
          required: true, 
          include: [
            {
              model: UserMembership,
              include: [{ model: Member, as: "member", attributes: ["name", "mobile"] }]
            }
          ]
        }
      ],
      // 👇 YAHAN CHANGE KIYA HAI 👇
      // "createdAt" ko hata kar "id" kar diya hai
      order: [["payment_date", "DESC"], ["id", "DESC"]] 
    });

    res.status(200).json({ status: "success", result: payments });
  } catch (error) {
    console.error("Get Payments Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};