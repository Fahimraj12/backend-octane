const InvoiceMaster = require("../models/InvoiceMaster");
const Payment = require("../models/Payment");
const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");

exports.getAllInvoices = async (req, res) => {
    try {
        const { financialyear_id } = req.query; // 👈 Query params se FY ID

        console.log(financialyear_id);

        const whereCondition = {};
        if (financialyear_id) {
            whereCondition.financialyear_id = financialyear_id;
        }

        const invoices = await InvoiceMaster.findAll({
            where: whereCondition, // 👈 Sahi saal ke invoices
            include: [
                { model: Payment },
                {
                    model: UserMembership,
                    include: [
                        { model: Member, as: "member", attributes: ["id", "name", "mobile"] }
                    ]
                }
            ],
            order: [["receipt_date", "DESC"], ["createdAt", "DESC"]]
        });

        res.status(200).json({ status: "success", result: invoices });
    } catch (error) {
        console.error("Get Invoices Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};

exports.getInvoices = async (req, res) => {
    try {
        const { financialyear_id } = req.params; // 👈 Query params se FY ID

        // console.log(financialyear_id);

        const whereCondition = {};
        if (financialyear_id) {
            whereCondition.financialyear_id = financialyear_id;
        }

        const invoices = await InvoiceMaster.findAll({
            where: whereCondition, // 👈 Sahi saal ke invoices
            include: [
                { model: Payment },
                {
                    model: UserMembership,
                    include: [
                        { model: Member, as: "member", attributes: ["id", "name", "mobile"] }
                    ]
                }
            ],
            order: [["receipt_date", "DESC"], ["createdAt", "DESC"]]
        });

        res.status(200).json({ status: "success", result: invoices });
    } catch (error) {
        console.error("Get Invoices Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};