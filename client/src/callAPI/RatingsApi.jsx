import axios from "axios";
axios.defaults.withCredentials = true;

export async function getAllRatings() {
  try {
    const res = await axios.get("/ratings");

    const allRatings = await res.data.data; //res.data(axios res) - .data (structured data response in backend)

    // console.log("ratings allRatings:", allRatings);

    return allRatings;
  } catch (err) {
    console.log(err);
  }
}

// called when the app launch (Welcome.jsx)
export async function getThisUserRatings(userId) {
  let api_url = `${axios.defaults.baseUrl}/ratings`;

  try {
    const res = await axios.get("/ratings");

    const ratings = res.data.data; //res.data(axios res) - .data (structured data response in backend)

    // console.log("ratings:", ratings);

    return ratings;
  } catch (err) {
    console.log(err);
  }
}

//POST A RATING IDENTITY  (ONE TIME)
export async function ratingIdentity(userId, triggeredRatedMealId) {
  try {
    const response = await axios.post(
      "/ratings",
      {
        user: userId,
        ratedMeal: triggeredRatedMealId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const rating = response.data.data;

    // console.log("new First Time POST in Rating collection:", rating);

    return rating;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE IN RATING SENDING NEW RATEDMEAL IDS
export async function ratingUpdation(ratingId, ratedIds) {
  try {
    const response = await axios.put(
      `/ratings/rating/${ratingId}`,
      {
        ratedMeals: ratedIds,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const updateOnfire = response.data.data;

    // console.log("new First Time POST in Rating collection:", updateOnfire);

    return updateOnfire;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE MEAL SCORE RATINGS
export async function updateMealScoreRating(mealId, resultArrRating) {
  try {
    console.log("meal aHi ID:", mealId);
    console.log("result AAiH Ratings:", resultArrRating);

    const res = await axios.put(
      `/ratings/newratings/meal/${mealId}`,
      {
        ratingsArr: resultArrRating,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newMealRating = res.data.data;

    // console.log("new Meal RATINGS --API:", newMealRating);
    return newMealRating;
  } catch (err) {
    console.log(err);
  }
}
