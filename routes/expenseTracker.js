const express = require("express");

const path = require("path");
const router = express.Router();
const mainController = require("../controllers/expenseTracker");
const authentication = require("../middleware/auth");

router.get("/form", mainController.getForm);

router.post("/form", mainController.postForm);

router.get(
  "/getDetails",
  authentication.getVerifyingIdFromToken,
  mainController.getDetails
);

// router.put("/edit/:id", mainController.editElement);

router.delete("/delete/:id/:expense",mainController.deleteElement);

module.exports = router;
