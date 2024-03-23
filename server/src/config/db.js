const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  console.log(`MongoDB Connected: ${conn.connection.host}`);

  /* console.log(`MongoDB Connected`); */
};

mongoose.set("strictQuery", true);

module.exports = connectDB;
