const express = require("express");
const router = express.Router();
var cors = require("cors");

/* const RatingUser = require("../models/rating-user");
 */
const Meal = require("../models/meal");
const User = require("../models/user");
const Rating = require("../models/rating");

const RatedMeal = require("../models/rated-meal");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

router.use(express.json());

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
      "https://tds-restaurant-three.vercel.app",
      "https://tds-restaurant-three-back-end.onrender.com",
    ],
    preflightContinue: false,
    credentials: true,
  })
);

//FOR GETTING  ALL RATINGS
router.get("/", async (req, res) => {
  try {
    const ratings = await Rating.find().populate("ratedMeals");

    if (ratings.length !== 0) {
      return res.status(200).json({ success: true, data: ratings });
    } else {
      return res.status(200).json({ success: true, data: {} });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't GeT all ratings document of this User",
    });
    console.log(err);
  }
});

//FOR GETTING THIS USER ALL RATINGS
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const rating = await Rating.findOne({ user: userId }).populate(
      "ratedMeals"
    );

    if (rating !== null) {
      return res.status(200).json({ success: true, data: rating });
    } else {
      return res.status(200).json({ success: true, data: {} });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't GeT all ratings document of this User",
    });
    console.log(err);
  }
});

//POST A RATING IDENTITY  (ONE TIME)
router.post("/rating", async (req, res) => {
  try {
    let ratedMealId = req.body.ratedMeal;
    console.log("ratedMealId:", ratedMealId);
    let arr = [ratedMealId];

    let newRating = new Rating({
      user: req.body.user,
      ratedMeals: ratedMealId,
    });

    newRating = await newRating.save();

    res.json({ success: true, data: newRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't create rating(posting first time)",
    });
    console.log(err);
  }
});

//UPDATE IN RATING SENDING NEW RATEDMEAL IDS
router.post("/rating", async (req, res) => {
  try {
    const updateMyRating = await Rating.findByIdAndUpdate(
      req.params.ratingId,
      {
        ratedMeals: req.body.ratedMeals,
      },
      { new: true }
    ).populate("ratedMeals");

    res.json({ success: true, data: updateMyRating });
  } catch (err) {
    res.status(500).json({
      success: false,
      error:
        "Error: something went wrong can't create rating(posting first time)",
    });
    console.log(err);
  }
});

// FOR UPDATE (PUT) RATINGS SCORE
router.put("/newratings/meal:mealId", async (req, res) => {
  try {
    console.log("HAHAHA HAHA");
    const mealId = req.params.mealId;
    const wholeNotes = req.body.ratingsArr;

    //legit rating between 3 and 5
    const wholeNotesFilter = wholeNotes.filter((item) => item >= 3);

    // occurenceNote

    const occurenceNoteObj = wholeNotesFilter.reduce((acc, val, i) => {
      const alreadyInside = Object.values(acc);

      const idCheck = alreadyInside.findIndex((item) => item.rating === val);

      if (idCheck !== -1) {
        const count = alreadyInside[idCheck].count;

        const updateAcc = {
          ...acc,
          [idCheck]: { ...acc[idCheck], count: count + 1 },
        };
        return updateAcc;
      } else {
        const index = Object.keys(acc).length;
        return { ...acc, [index]: { rating: val, count: 1 } };
      }
    }, {});

    console.log("occurence:", occurenceNoteObj);

    // retrieve max occurence
    const occurenceNoteArr = Object.values(occurence);

    const maxOccurence = occurenceNoteArr.reduce((acc, val, i) => {
      /* console.log("acc :", acc); */
      const newMax = val.count <= acc?.count ? acc : val;
      return newMax;
    }, {});

    const newRatingValue = maxOccurence.rating;

    const mealUpdate = await Meal.findByIdAndUpdate(
      mealId,
      {
        ratings: newRatingValue,
      },
      { new: true }
    );

    res.json({ success: true, data: mealUpdate });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "something went wrong in update" });
    console.log(err);
  }
});

module.exports = router;
