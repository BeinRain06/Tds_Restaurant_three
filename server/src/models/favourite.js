const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
