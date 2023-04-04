const Expense = require("../models/expenseTracker");
const Login = require("../models/signUp");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

exports.getForm = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "ExpenseTracker", "trackerForm.html")
  );
};

exports.getDetails = async (req, res, next) => {
  const idd = req.user;
  const isPremium = await Login.findOne({ _id: req.user }).select(
    "ispremiumuser"
  );

  console.log(isPremium);

  const page = parseInt(req.query.page);
  const ITEMS_PER_PAGE = parseInt(req.query.limit);

  var totalCount = await Expense.countDocuments({ loginId: idd });

  // const user = await Expense.findAll({
  //   where: { loginId: idd },
  //   offset: (page - 1) * ITEMS_PER_PAGE,
  //   limit: ITEMS_PER_PAGE,
  // });

  const user = await Expense.find({ loginId: idd })
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  if (user == "") {
    return res
      .status(200)
      .json({ premium: isPremium.ispremiumuser, datas: null });
  } else {
    res.status(200).json({
      allUsers: user,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalCount,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalCount / ITEMS_PER_PAGE),
      premium: isPremium.ispremiumuser,
    });
  }
};

exports.postForm = async (req, res, next) => {
  //retreving User Id from Token
  const token = req.header("Authorization");
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;

  const expense = req.body.expense;
  const desc = req.body.description;
  const category = req.body.category;

  const pass = await Login.findOne({ _id: userId }).select("totalExpenses");

  var totalExpensesChanged = pass.totalExpenses + parseInt(expense);

  await Login.updateOne(
    { _id: userId },
    { $set: { totalExpenses: totalExpensesChanged } }
  );

  const expenseDb = new Expense({
    expense: expense,
    description: desc,
    category: category,
    loginId: userId,
  });

  await expenseDb.save();
  return res.status(201).json();
};

exports.deleteElement = async (req, res, next) => {
  const token = req.header("Authorization");
  const expense = req.params.expense;
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;

  const pass = await Login.findOne({
    _id: userId,
  }).select("totalExpenses");

  var totalExpensesChanged = pass.totalExpenses - parseInt(expense);

  await Login.updateOne(
    { _id: userId },
    { $set: { totalExpenses: totalExpensesChanged } }
  );

  try {
    const uId = new ObjectId(req.params.id);
    await Expense.deleteOne({ _id: uId });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
