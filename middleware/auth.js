const jwt = require("jsonwebtoken");

const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId;

const getVerifyingIdFromToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const valuesFromToken = jwt.verify(
      token,
      "45asd@asd8a6sd45POsoO0ddw2s9kA56s#o3asd3da22WwoW52"
    );

    req.user = new ObjectId( valuesFromToken.userId);
    req.names = valuesFromToken.names;


    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: "false" });
  }
};

module.exports = { getVerifyingIdFromToken };
