const express = require("express");

const router = express.Router();
const premiumController = require("../controllers/leaderBoard");

router.get("/premium/leaderboard", premiumController.getLeaderboard);

module.exports = router;
