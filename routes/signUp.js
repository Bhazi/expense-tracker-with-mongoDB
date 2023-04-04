const express = require("express");

const route = express.Router();
const controller = require("../controllers/signUp");

route.get("/", controller.getLogin);
route.post("/", controller.postData);

module.exports = route;
