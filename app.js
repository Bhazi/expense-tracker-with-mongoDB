const express = require("express");
const app = express();
const fs = require("fs");

const mongoose = require("mongoose");

const path = require("path");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

// const helmet = require("helmet");
const morgan = require("morgan");

//Models
// const Expense = require("./models/expenseTracker");
// const Login = require("./models/signUp");
// const Order = require("./models/order");
// const ForgotPassReq = require("./models/forgotPasswordRequest");
// const FilesDownloaded = require("./models/filesDownloaded");

//Routes
const signUpRoutes = require("./routes/signUp");
const loginRoutes = require("./routes/login");
const expenseTrackerFormRoutes = require("./routes/expenseTracker");
// const purchase = require("./routes/purchase");
const premium = require("./routes/premium");
// const forgotPassword = require("./routes/forgot_resetPassword");
// const downloadFile = require("./routes/downloadFile");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginResourcePolicy: false,
//   })
// );

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.use(signUpRoutes);
app.use(loginRoutes);
app.use("/user", expenseTrackerFormRoutes);
// app.use("/purchase", purchase);
app.use(premium);
// app.use(forgotPassword);
// app.use(downloadFile);

//Associations
// Login.hasMany(Expense);
// Expense.belongsTo(Login);

// Login.hasMany(Order);
// Order.belongsTo(Login);

// Login.hasMany(ForgotPassReq);
// ForgotPassReq.belongsTo(Login);

// Login.hasMany(FilesDownloaded);
// FilesDownloaded.belongsTo(Login);

//syncing with port
// sequelize
//   .sync({ force: false })
//   .then((data) => {
//     app.listen(4001);
//   })
//   .catch((err) => console.log(err));
mongoose
  .connect(
    "mongodb+srv://Bhazi:accUp2pXejVm7DGR@cluster0.oludblc.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(4001);
  })
  .catch((err) => {
    console.log(err);
  });
