const express = require("express");

const path = require("path");
const router = express.Router();
const authentication = require("../middleware/auth");
const downloadFileController = require("../controllers/downloadFile");

// router.get(
//   "/download",
//   authentication.getVerifyingIdFromToken,
//   downloadFileController.getDownloadFile
// );

// router.get("/downloaded/mainPage", downloadFileController.getDownloadedPage);
// router.get(
//   "/downloaded/links",
//   authentication.getVerifyingIdFromToken,
//   downloadFileController.getDownloadedFiles
// );
module.exports = router;
