const express = require("express");

const router = express.Router();
var cors = require("cors");

const Payment = require("../models/payment");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
      "https://tds-restaurant-three-ui.vercel.app",
      "https://tds-restaurant-three.vercel.app/",
      "https://tds-restaurant-three-back-end.onrender.com",
    ],
    preflightContinue: false,
    credentials: true,
  })
);

// Get All List
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong cannot  retrieve  payments ",
    });
    console.log(err);
  }
});

// create payment
router.post("/payment", async (req, res) => {
  let params = {
    order: req.body.order,
    account: req.body.account,
    codePayment: req.body.codePayment,
    amountBill: req.body.amountBill,
  };

  console.log("params payment before axios:", params);
  try {
    console.log();

    const status = "non-paid";

    let payment = new Payment({
      order: req.body.order,
      account: req.body.account,
      codePayment: req.body.codePayment,
      amountBill: req.body.amountBill,
      status: status,
    });

    payment = await payment.save();

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error:  cannot create payment ",
    });
    console.log(err);
  }
});

// update payment
router.put("/payment/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const status = "paid";

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        account: req.body.account,
        amountBill: req.body.amountBill,
        status: status,
      },
      { new: true }
    );

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error:  cannot  update  payment ",
    });
    console.log(err);
  }
});

module.exports = router;
