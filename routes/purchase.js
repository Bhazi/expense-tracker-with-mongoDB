const express = require("express");

const purchaseController = require("../controllers/purchase");

const authentication = require("../middleware/auth");

const router = express.Router();

// router.get(
//   "/premiummembership",
//   authentication.getVerifyingIdFromToken,
//   purchaseController.purchasepremium
// );

// router.post(
//   "/updatetransactionstatus",
//   authentication.getVerifyingIdFromToken,
//   purchaseController.updateTransactionStatus
// );

module.exports = router;
