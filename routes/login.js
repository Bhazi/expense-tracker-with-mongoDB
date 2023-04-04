const express = require("express");

const route = express.Router();
const controller = require("../controllers/login");

route.get("/login", controller.getLogIn);
route.post("/login", controller.postLogin);

module.exports = route;
