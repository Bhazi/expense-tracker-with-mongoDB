const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ForgotPassReq = sequelize.define("ForgotPasswordRequests", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  isactive: Sequelize.BOOLEAN,
});

module.exports = ForgotPassReq;
