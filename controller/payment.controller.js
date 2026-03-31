const Payment = require("../models/Payment");
const InvoiceMaster = require("../models/InvoiceMaster");
const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [
                {
                    model: InvoiceMaster,
                    include: [
                        {
                            model: UserMembership,
                            include: [
                                { model: Member, as: "member", attributes: ["id", "name", "mobile"] }
                            ]
                        }
                    ]
                }
            ],
            order: [["payment_date", "DESC"], ["id", "DESC"]] // Latest payment upar
        });

        res.status(200).json({ status: "success", result: payments });
    } catch (error) {
        console.error("Get Payments Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};  