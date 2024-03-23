//route domains
const mealsRouter = require("./routes/meals-route");

const categoriesRouter = require("./routes/categories-route");

const ordersRouter = require("./routes/orders-route");

const userRouter = require("./routes/users-route");

const ratedMealRouter = require("./routes/rated-meal-route");

const ratingsRouter = require("./routes/ratings-route");

const paymentRouter = require("./routes/payments-route");

const requireAuthJwt = require("./protect-api/jwt");

const errorHandler = require("./protect-api/error-handler");

// express Brain

const express = require("express");

const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT;

const api = process.env.API_BASE_URL;

//implement multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/meats");
  },
  filename: function (req, file, callback) {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;

    callback(null, filename);
  },
});

//configure multer to upload in remote_url
const upload = multer({
  storage: storage,

  limits: { fileSize: 100000 },
});

//post single image with multer
/* upload.single("dessert");
upload.single("meat");
upload.single("vegetarian");
upload.single("seafood"); */
app.post("/api/delivery/picture", upload.single("meat"), function (req, res) {
  console.log(req.file);
  res.json({
    success: true,
    /*   profile_url: `/api/delivery/picture/${req.file.filename}`, //fetching url img_name path */

    profile_url: `/api/delivery/images/${req.file.filename}`, //fetching url img_name path
  });
});

//BASE_URL to print image in browse

app.use("/api/delivery/images", express.static("public/images/meats"));

app.use("/api/delivery/images", express.static("public/images/vegetarians"));

app.use(
  "/api/delivery/images",
  express.static(__dirname + "/public/images/desserts")
);

app.use(
  "/api/delivery/images",
  express.static(__dirname + "/public/images/seafoods")
);

/* app.use("/api/delivery/images", express.static("public/images/desserts")); */ //e.g : http://localhost:5000/api/delivery/images/dessert_1702648345030.jpeg

// Alias New Routes middleware
app.use(`${api}/meals`, mealsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/payments`, paymentRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/ratings`, ratingsRouter);
app.use(`${api}/ratedmeals`, ratedMealRouter);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(bodyParser.json()); */
app.use(requireAuthJwt());
app.use(errorHandler);

//middleware display index.html
app.use("/website/html", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ users: "Hello My Back!" });
});

//mongoDB connect call &  nodejs server listening port
const connectDB = require("./config/db");

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  })
);

/* app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
}); */
