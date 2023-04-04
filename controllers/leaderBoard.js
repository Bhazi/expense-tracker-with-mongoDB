const sequelize = require("../util/database");
const path = require("path");
const Expense = require("../models/expenseTracker");
const Login = require("../models/signUp");

exports.getLeaderboard = async (req, res, next) => {
  // const valuee = await Expense.findAll({
  //   attributes: [
  //     "loginId",
  //     [sequelize.fn("sum", sequelize.col("expense")), "total_amount"],
  //   ],
  //   group: ["loginId"],
  // });

  // const value = await Login.findAll({
  //   order: sequelize.literal("totalExpenses DESC"),
  //   attributes: ["totalExpenses","name"],
  // });
  // res.status(200).json({ values: value });

  try {
    const values = await Login.find()
      .select("name totalExpenses")
      .sort({ totalExpenses: "desc" });

    res.status(200).json({ values });
  } catch (err) {
    console.log(err);
  }
};
