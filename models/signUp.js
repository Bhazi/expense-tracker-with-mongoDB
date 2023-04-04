// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");
// const loginData = sequelize.define("login", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   ispremiumuser: Sequelize.BOOLEAN,
//   totalExpenses: Sequelize.INTEGER,
// });

// module.exports = loginData;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signupSchema = new Schema({
  name: {
    type: String,
    requires: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Boolean,
    required: false,
  },
  totalExpenses: {
    type: Number,
    default:0,
    required: false,
  },
  
  // userId:{
  //   type:Schema.Types.ObjectId,
  //   ref:'User',
  //   required:true
  // }
});

module.exports = mongoose.model("Signup", signupSchema);
