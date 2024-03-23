const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  account: {
    type: String,
    required: true,
    default: "",
  },
  codePayment: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "non-paid",
  },
  amountBill: {
    type: Number,
    default: "",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
