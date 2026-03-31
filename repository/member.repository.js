const Member = require("../models/Member");
const Membership = require("../models/UserMembership"); 
const Invoice = require("../models/InvoiceMaster");       
const BmiHistory = require("../models/BmiHistory");
const { Op } = require("sequelize"); // ✅ Ensure Op is imported for the addBmiRecord logic

// =========================================================================
// ✅ FIX: Relationships ko Function se bahar nikala gaya hai.
// Isse Sequelize sirf server start hone par 1 baar inko define karega.
// =========================================================================
Member.hasMany(Membership, { foreignKey: 'member_id' });
Membership.belongsTo(Member, { foreignKey: 'member_id' });

Member.hasMany(Invoice, { foreignKey: 'member_id' });
Invoice.belongsTo(Member, { foreignKey: 'member_id' });

Member.hasMany(BmiHistory, { foreignKey: 'member_id', as: 'bmi_history' }); 
BmiHistory.belongsTo(Member, { foreignKey: 'member_id' });
// =========================================================================

class MemberRepository {
  // GET all members
 // GET all members
  async getAllMembers() {
    try {
      const members = await Member.findAll({
        
        // ✅ NAYA: Include BMI History in the list so the frontend can calculate the quota
        include: [
          {
            model: Membership, // 👈 ADDED: Fetch membership plans
            required: false
          },
          {
            model: BmiHistory,
            as: 'bmi_history',
            required: false // 'false' ensures we still get members even if they have 0 BMI records
          }
        ]
      });
      
      return {
        status: "success",
        result: members,
      };
    } catch (error) {
      console.error("Sequelize Error in getAllMembers:", error);
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // GET Member by ID
  async getMemberById(id) {
    try {
      // ✅ Yahan se humne manually relationship mapping hata di hai kyunki wo upar define ho chuki hai
      const member = await Member.findByPk(id, {
        include: [
          { model: Membership },
          { model: Invoice },
          { model: BmiHistory, as: 'bmi_history', separate: true, order: [['check_date', 'DESC']] } 
        ]
      });

      if (!member) return { status: "fail", result: "Member not found" };
      return { status: "success", result: member };
    } catch (error) {
      console.error("Sequelize Error:", error);
      return { status: "error", result: error.message };
    }
  }

  // CREATE Member
  async createMember(data) {
    try {
      const existingMember = await Member.findOne({
        where: { email: data.email },
      });

      if (existingMember) {
        return {
          status: "conflict",
          result: "Member already exists",
        };
      }

      const newMember = await Member.create(data);

      return {
        status: "success",
        result: "newMember created successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // UPDATE Member
  async updateMember(id, data) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return {
          status: "fail",
          result: "Member not found",
        };
      }

      const updatedMember = await member.update(data);
      return {
        status: "success",
        result: "updatedMember updated successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // DELETE Member
  async deleteMember(id) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return {
          status: "fail",
          result: "Member not found",
        };
      }

      await member.destroy();
      return {
        status: "success",
        result: "Member deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        result: error.message,
      };
    }
  }

  // BMI Logic ke sath record add karna
  async addBmiRecord(member_id, height, weight) {
    try {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

      // 1. Check karein is saal me kitne "Free" check ho chuke hain
      const freeChecksCount = await BmiHistory.count({
        where: {
          member_id,
          is_free: true,
          check_date: { [Op.between]: [startOfYear, endOfYear] }
        }
      });

      // 2. BMI Score aur Category calculate karein
      const heightInMeters = height / 100;
      const bmi_score = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      
      let status = "Normal";
      if (bmi_score < 18.5) status = "Underweight";
      else if (bmi_score >= 25 && bmi_score <= 29.9) status = "Overweight";
      else if (bmi_score >= 30) status = "Obese";

      // 3. Agar count 2 se kam hai toh Free, warna Paid (false)
      const is_free = freeChecksCount < 2; 

      // 4. Database mein save karein
      const newRecord = await BmiHistory.create({
        member_id, height, weight, bmi_score, status, is_free
      });

      return { status: "success", result: newRecord };
    } catch (error) {
      return { status: "error", result: error.message };
    }
  }
}

module.exports = new MemberRepository();