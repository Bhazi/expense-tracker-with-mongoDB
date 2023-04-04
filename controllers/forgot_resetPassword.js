const { v4: uuidv4 } = require("uuid");
const ForgotPassReq = require("../models/forgotPasswordRequest");
const jwt = require("jsonwebtoken");
const Login = require("../models/signUp");
const bcrypt = require("bcrypt");
const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const path = require("path");
const { where } = require("sequelize");

exports.getForgotPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "views",
      "Authentication",
      "forgotPasswordForm.html"
    )
  );
};

exports.postForgotPassword = async (req, res) => {
  const tranEmailapi = new Sib.TransactionalEmailsApi();
  const uuidNumber = uuidv4();

  await ForgotPassReq.create({
    id: uuidNumber,
  });

  const sender = {
    email: "ibasimk@gmail.com",
    name: "GuyTechne",
  };

  const receivers = [{ email: req.body.email }];

  tranEmailapi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Reset Password Link",
      textContent: `
    for reset your password click this link {{params.role}}`,
      params: {
        role: `http://localhost:4001/password/resetpassword/${uuidNumber}`,
      },
    })
    .then((data) => {
      res.status(201).json();
      console.log(res);
    })
    .catch(console.log);
};

exports.getResetPassword = async (req, res, next) => {
  const checkingId = await ForgotPassReq.findByPk(req.params.uuid);
  if (checkingId) {
    await ForgotPassReq.update(
      {
        isactive: true,
      },
      { where: { id: req.params.uuid } }
    );

    res.sendFile(
      path.join(
        __dirname,
        "../",
        "views",
        "Authentication",
        "updatePassword.html"
      )
    );
  } else {
    console.log("come on");
  }
  // res.sendStatus(200);
};

exports.postResetpassword = async (req, res) => {
  const token = req.header("Authorization");
  const userId = jwt.verify(
    token,
    "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
  ).userId;

  await ForgotPassReq.update(
    {
      isactive: false,
    },
    { where: { id: req.params.uuid } }
  );

  bcrypt.hash(req.body.password, 10, async (req, hash) => {
    await Login.update(
      {
        password: hash,
      },
      { where: { id: userId } }
    )
      .then((data) => {
        res.status(201).json();
      })

      .catch((err) => {
        console.log(err);
        res.status(401).json();
      });
  });
};
