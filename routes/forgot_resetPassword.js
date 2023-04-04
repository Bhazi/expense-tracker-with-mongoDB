const express = require("express");
const router = express.Router();

const forgot_reset_PasswordController = require("../controllers/forgot_resetPassword");

// router.get(
//   "/password/forgotPassword",
//   forgot_reset_PasswordController.getForgotPassword
// );

// router.post(
//   "/password/forgotPassword",
//   forgot_reset_PasswordController.postForgotPassword
// );

// router.get(
//   "/password/resetpassword/:uuid",
//   forgot_reset_PasswordController.getResetPassword
// );

// router.post(
//   "/password/resetpassword/:uuid",
//   forgot_reset_PasswordController.postResetpassword
// );

module.exports = router;
