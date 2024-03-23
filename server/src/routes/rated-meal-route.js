const express = require("express");
const router = express.Router();
const cors = require("cors");
const moment = require("moment");

const RatedMeal = require("../models/rated-meal");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));

router.use(express.json());

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

// FOR POSTING RATED MEALS
router.post("/", async (req, res) => {
  try {
    let newFeedback;

    if (req.body.feedback === "") {
      newFeedback = "average";
    } else {
      newFeedback = req.body.feedback;
    }

    let newRatedMeal = new RatedMeal({
      meal: req.body.meal,
      rating: req.body.rating,
      feedback: newFeedback,
      dateMention: moment().format("Do MMMM, YYYY"),
    });

    newRatedMeal = await newRatedMeal.save(); //mongoDB save
    console.log("newRatedMeal :", newRatedMeal);

    res.json({ success: true, data: newRatedMeal });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rated-meal",
    });

    console.log(err);
  }
});

// send ratingUserId in context API frontend
//FOR GET
router.get("/", async (req, res) => {
  try {
    const ratingUserId = await req.body._id;

    res.json({ success: true, data: ratingUserId });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't get ratedMeals",
    });

    console.log(err);
  }
});

//UPDATE(PUT) - Rated MEAL EXISTING
router.put("/ratedmeal:ratedId", async (req, res) => {
  try {
    console.log("rating on updation process");

    const ratedId = req.params.ratedId;

    const updateInstance = await RatedMeal.findByIdAndUpdate(
      ratedId,
      {
        rating: req.body.rating,
        feedback: req.body.feedback,
        dateMention: moment().format("Do MMMM, YYYY"),
      },
      { new: true }
    ).populate("meal", ["name", "origin", "ratings"]);

    res.json({
      success: true,
      data: updateInstance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't update rating",
    });

    console.log(err);
  }
});

module.exports = router;
