const path = require("path");
const Signup = require("../models/signUp");
const bcrypt = require("bcrypt");



exports.getLogin = (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "views", "Authentication", "signUpPage.html")
  );
  // res.send("hello");
};

exports.postData = (req, res) => {
  var { name, email, password } = req.body;

  if (name == "" || email == "" || password == "") {
    return res.status(400).json();
  }

  console.log(name, email, password);

  // bcrypt.hash(req.body.password, 10, async (req, hash) => {
  //   await Login.create({
  //     name: name,
  //     email: email,
  //     password: hash,
  //   })
  //     .then((data) => {
  //       res.status(201).json();
  //     })

  //     .catch((err) => {
  //       console.log("already exist the mail");
  //       res.status(401).json();
  //     });
  // });

  bcrypt.hash(req.body.password, 10, async (req, hash) => {
    const signup = new Signup({
      name: name,
      email: email,
      password: hash,
      ispremiumuser: null,
      totalExpenses: null,
    });
    signup
      .save()
      .then((data) => {
        res.status(201).json({ message: "success" });
      })
      .catch((err) => {
        console.log("already exist the mail");
        res.status(401).json({ message: "fail" });
      });
  });
};

// const signup = new Signup({
//   title: title,
//   price: price,
//   description: description,
//   imageUrl: imageUrl,
//   userId: req.user,
// });
// signup.save().then().catch();
