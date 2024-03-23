const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  miniDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: false,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Meal", MealSchema);
