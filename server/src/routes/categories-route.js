const express = require("express");
const router = express.Router();
var cors = require("cors");

const Category = require("../models/category");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

// --> preflight request
router.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tds-restaurant-three-back-end.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

// FOR POST
router.use(async (req, res) => {
  try {
    console.log("Time: ", Date.now());
    let newCategory = new Category({
      name: req.body.name,
      color: req.body.color,
    });

    newCategory = await newCategory.save(); //mongoDB save

    res.json({ success: true, data: newCategory });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create meal",
    });

    console.log(err);
  }
});

/*get Categories*/
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.json({ success: true, data: category });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find categories" });
    console.log(err);
  }
});

module.exports = router;
