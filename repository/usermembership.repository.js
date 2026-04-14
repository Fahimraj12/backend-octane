const UserMembership = require("../models/UserMembership");
const Member = require("../models/Member");
const MembershipPackage = require("../models/MembershipPackage");
const InvoiceMaster = require("../models/InvoiceMaster");
const Payment = require("../models/Payment");

// CREATE
exports.createUserMembership = async (data, transaction) => {
  try {
    const result = await UserMembership.create(data, { transaction });
    return { status: "success", result };
  } catch (error) {
    throw error;
  }
};

// GET ALL (With all nested relations)
exports.getAllUserMemberships = async (financialyear_id) => {
  try {
    // 👈 NAYA LOGIC: FY filter
    const invoiceCondition = {};
    if (financialyear_id) {
        invoiceCondition.financialyear_id = financialyear_id;
    }

    const result = await UserMembership.findAll({
      include: [
        { model: Member, as: "member", attributes: ["id", "name", "mobile", "email"] },
        {
          model: MembershipPackage,
          as: "membershipPackage",
          attributes: ["id", "name", "selling_price", "mrp", "gst_status", "gst_percentage"]
        }, 
        {
          model: InvoiceMaster,
          where: invoiceCondition, // 👈 Filter lag gaya
          required: financialyear_id ? true : false, // 👈 Agar filter bheja hai to sirf wahi ayenge (Inner Join)
          include: [{ model: Payment }]
        }
      ],
      order: [["createdAt", "DESC"]],
    });
    return { status: "success", result };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

// GET BY ID
exports.getUserMembershipById = async (id) => {
  try {
    const result = await UserMembership.findByPk(id, {
      include: [
        { model: Member, as: "member" },
        { model: MembershipPackage, as: "membershipPackage" },
        {
          model: InvoiceMaster,
          include: [{ model: Payment }]
        }
      ]
    });

    if (!result) return { status: "fail", message: "Membership not found" };
    return { status: "success", result };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// UPDATE (Transaction optional ke liye handle kiya hai)
exports.updateUserMembership = async (id, updateData, transaction = null) => {
  try {
    const membership = await UserMembership.findByPk(id);
    if (!membership) return { status: "fail", message: "Not found" };

    await membership.update(updateData, { transaction });
    return { status: "success", result: membership };
  } catch (error) {
    throw error;
  }
};

// DELETE
exports.deleteUserMembership = async (id) => {
  try {
    const membership = await UserMembership.findByPk(id);
    if (!membership) return { status: "fail", message: "Not found" };

    await membership.destroy();
    return { status: "success", message: "Deleted successfully" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};