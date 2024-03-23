const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
    // ? :bscript hash password
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  street: {
    type: String,
    required: true,
    default: "",
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favourite",
      default: "",
    },
  ],
  isAdmin: {
    type: Boolean,
    /* required: true, */
    default: false,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

// export userSchema template as User template of one collection in User document (mongoDB)
module.exports = mongoose.model("User", userSchema);

// export userSchema under the name of userSChema
exports.userSchema = userSchema;
