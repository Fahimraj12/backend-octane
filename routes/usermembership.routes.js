const express = require("express");
const router = express.Router();

// Controller import kar lein
const userMembershipController = require("../controller/usermembership.controller");

// ==========================================
// MEMBERSHIP ROUTES
// ==========================================

// 1. Create User Membership (with Invoice & Initial Payment)
// POST: /api/usermembership/
router.post("/", userMembershipController.createUserMembership);

// 2. Get All User Memberships
// GET: /api/usermembership/
router.get("/", userMembershipController.getAllUserMemberships);

// 3. Get Expiring Memberships 
// ⚠️ DHYAN DEIN: Isko hamesha '/:id' wale route se UPAR rakhna hai.
// Agar neeche rakha, toh express 'expiring' word ko ID samajh lega aur error dega.
// GET: /api/usermembership/expiring
router.get("/expiring", userMembershipController.getExpiringMemberships);

// 4. Get User Membership by ID
// GET: /api/usermembership/:id
router.get("/:id", userMembershipController.getUserMembershipById);

// 5. Delete User Membership
// DELETE: /api/usermembership/:id
router.delete("/:id", userMembershipController.deleteUserMembership);

// ==========================================
// PAYMENT ROUTES
// ==========================================

// 6. Add Pending / Partial Payment 
// Ye route purane update (PUT) method ko replace karega payment ke liye.
// POST: /api/usermembership/pay-outstanding
router.post("/pay-outstanding", userMembershipController.addPendingPayment);

module.exports = router;