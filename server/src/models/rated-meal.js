const mongoose = require("mongoose");
const moment = require("moment");

const ratedMealSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    default: "",
  },
  dateMention: {
    type: String,
    default: moment().format("Do MMMM, YYYY"),
  },
});

//virtual id
ratedMealSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ratedMealSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("RatedMeal", ratedMealSchema);
