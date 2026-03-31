const InvoiceMaster = require("../models/InvoiceMaster");
const Payment = require("../models/Payment");
const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceMaster.findAll({
            include: [
                { model: Payment }, // Saari payments laane ke liye (Paid/Due calculation ke liye)
                {
                    model: UserMembership,
                    include: [
                        { model: Member, as: "member", attributes: ["id", "name", "mobile"] } // Member ka naam laane ke liye
                    ]
                }
            ],
            order: [["receipt_date", "DESC"], ["createdAt", "DESC"]] // Latest invoice upar
        });

        res.status(200).json({ status: "success", result: invoices });
    } catch (error) {
        console.error("Get Invoices Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};