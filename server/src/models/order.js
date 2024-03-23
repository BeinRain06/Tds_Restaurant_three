const mongoose = require("mongoose");
const dateFns = require("date-fns");
var moment = require("moment");
/* import { format } from "date-fns"; */

const orderSchema = new mongoose.Schema({
  ordersSpecs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderSpecs",
      required: true,
    },
  ],

  city: {
    type: String,
    default: "",
  },

  street: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "Betiva",
  },

  totalPrice: {
    type: Number,
    default: 0,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },

  dateOrdered: {
    type: String,
    default: moment().format("Do MMMM, YYYY"),
  },
  status: {
    type: String,
    default: "pending",
  },
  codePayment: {
    type: String,
    default: "",
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
