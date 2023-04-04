const Razorpay = require("razorpay");
const Order = require("../models/order");
const Login = require("../models/signUp");
require("dotenv").config();

const purchasepremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    const order = await rzp.orders.create({ amount, currency: "INR" });
    console.log(order.id);
    const createOrder = await Order.create({
      orderId: order.id,
      status: "PENDING",
      loginId: req.user,
    });
    res.status(201).json({ order: createOrder, key_id: rzp.key_id });
  } catch (err) {
    console.log("Error:", err);
    return res
      .status(403)
      .json({ message: "Something went wrong", error: err });
  }
};

// exports.purchasepremium = async (req, res) => {
//   console.log(req.user);
//   try {
//     var rzp = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//     const amount = 2500;

//     const order = await rzp.orders.create({ amount, currency: "INR" });
//     req.user.createOrder({ orderid: order.id, status: "PENDING" });
//     return res.status(201).json({ order, key_id: rzp.key_id });
//   } catch (err) {
//     console.log("hello", err);
//     return res
//       .status(403)
//       .json({ message: "Something went wrong", error: err });
//   }
// };
// exports.purchasepremium = async (req, res, next) => {
//   try {
//     var rzp = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });
//     const amount = 2500;

//     const order = await rzp.orders.create({ amount, currency: "INR" });
//     await req.user.createOrder({
//       orderid: order.id,
//       status: "PENDING",
//     });
//     return res.status(201).json({ order: createOrder, key_id: rzp.key_id });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({ message: "Something went wrong", error: err });
//   }
// };

// var rzp = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// const amount = 2500;

// exports.updateTransactionStatus = async (req, res, next) => {
//   try {
//     const { payment_id, order_id } = req.body;
//     await Order.findOne({ where: { orderid: order_id } })
//       .then((order) => {
//         order
//           .update({ paymentid: payment_id, status: "SUCCESSFUL" })
//           .then(() => {
//             req.user
//               .update({ ispremiumuser: true })
//               .then(() => {
//                 return res
//                   .status(202)
//                   .json({ sucess: true, message: "Transaction successful" });
//               })
//               .catch((err) => {
//                 throw new Error(err);
//               });
//           })
//           .catch((err) => {
//             throw new Error(err);
//           });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   } catch (err) {
//     return res(403).json({ message: "something went wrong", error: err });
//   }
// };

const updateTransactionStatus = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderId: order_id } });
    await order.update({ paymentId: payment_id, status: "SUCCESSFUL" });
    await Login.update({ ispremiumuser: true }, { where: { id: req.user } });

    res.status(202).json({ success: true, message: "Transaction successful" });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "something went wrong", error: err });
  }
};

module.exports = { purchasepremium, updateTransactionStatus };
