const express = require("express");
const router = express.Router();
const cors = require("cors");
const Meal = require("../models/meal");
const Category = require("../models/category");
const RatedMeal = require("../models/rated-meal");
const Rating = require("../models/rating");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

router.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// FOR POST
router.post(
  "/meal",
  async (req, res, next) => {
    console.log("Time: ", Date.now());
    let newFood = new Meal({
      name: req.body.name,
      image: req.body.image,
      origin: req.body.origin,
      category: req.body.category,
      price: +req.body.price,
      miniDesc: req.body.miniDesc,
      longDesc: req.body.longDesc,
      ratings: +req.body.ratings,
      ingredients: req.body.ingredients,
    });
    try {
      const category = Category.findById(newFood.category);
      if (!category) {
        throw new Error("error: category not find");
      } else {
        newFood = await newFood.save();
        res.json({ success: true, data: newFood });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Error: something went wrong can't create meal",
      });

      console.log(err);
    }
    next();
  },
  (req, res) => {
    console.log("body request after next", req.body);
  }
);

/*get all Meals*/

//GET
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find().populate("category");
    res.json({ success: true, data: meals });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error: cannot find meals" });
    console.log(err);
  }
  // res.json({ success: "true", data: meals[0] });
});

//GET DESSERTS
router.get("/desserts:dessertsId", async (req, res) => {
  // res.json({ success: "true", data: meals[0].desserts });
  try {
    const desserts = await Meal.find({
      category: req.params.dessertsId,
    }).populate("category");
    res.json({ success: true, data: desserts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/seafoods/:seafoodsId", async (req, res) => {
  // res.json({ success: "true", data: meals[0].seaFoods });
  try {
    const seafoods = await Meal.find({
      category: req.params.seafoodsId,
    }).populate("category");
    res.json({ success: true, data: seafoods });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/meats/:meatsId", async (req, res) => {
  // res.json({ success: "true", data: meals[0].meats });
  try {
    const meats = await Meal.find({ category: req.params.meatsId }).populate(
      "category"
    );
    res.json({ success: true, data: meats });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/vegetarians/:vegetariansId", async (req, res) => {
  // res.json({ success: "true", data: meals[0].vegetarians });
  try {
    const vegetarians = await Meal.find({
      category: req.params.vegetariansId,
    }).populate("category");
    res.json({ success: true, data: vegetarians });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

// FOR PUT (ADMIN)
router.use("/:mealId", async (req, res) => {
  try {
    const mealUpdate = await Meal.findByIdAndUpdate(
      req.params.mealId,
      {
        $set: {
          name: req.body.name,
          image: req.body.image,
          sm_desc: req.body.sm_desc,
          lg_desc: req.body.lg_desc,
          category: req.body.category, // id of one inside collection category
          rating: req.body.rating,
          price: req.body.price,
          origin: req.body.origin,
        },
      },
      { new: true }
    );
    const category = Category.findById(mealUpdate.category);
    if (!category) {
      throw new Error("Error: category didn't match");
    }
    res.json({ success: true, data: mealUpdate });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "something went wrong in update" });
    console.log(err);
  }
});

//DELETE (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "something went wrong in delete" });
    console.log(err);
  }
});

module.exports = router;
