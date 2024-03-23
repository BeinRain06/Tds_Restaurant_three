import axios from "axios";

axios.defaults.withCredentials = true;

export async function getAllRatings() {
  let api_url = "http://localhost:5000/api/delivery/ratings";

  try {
    const res = await axios.get(`${api_url}`);

    const allRatings = await res.data.data; //res.data(axios res) - .data (structured data response in backend)

    console.log("ratings allRatings:", allRatings);

    return allRatings;
  } catch (err) {
    console.log(err);
  }
}

// called when the app launch (Welcome.jsx)
export async function getThisUserRatings(userId) {
  let api_url = "http://localhost:5000/api/delivery/ratings/rating";

  try {
    const res = await axios.get(`${api_url}/${userId}`);

    const ratings = res.data.data; //res.data(axios res) - .data (structured data response in backend)

    console.log("ratings:", ratings);

    return ratings;
  } catch (err) {
    console.log(err);
  }
}

//POST A RATING IDENTITY  (ONE TIME)
export async function ratingIdentity(userId, triggeredRatedMealId) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratings/rating`;

    const response = await axios.post(
      api_url,
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

    console.log("new First Time POST in Rating collection:", rating);

    return rating;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE IN RATING SENDING NEW RATEDMEAL IDS
export async function ratingUpdation(ratingId, ratedIds) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratings/rating/${ratingId}`;

    const response = await axios.put(
      api_url,
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

    console.log("new First Time POST in Rating collection:", updateOnfire);

    return updateOnfire;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE MEAL SCORE RATINGS
export async function updateMealScoreRating(mealId, resultArrRating) {
  try {
    let api_url = `http://localhost:3000/api/delivery/ratings/newratings/meal/${mealId}`;

    console.log("meal aHi ID:", mealId);
    console.log("result AAiH Ratings:", resultArrRating);

    const res = await axios.put(
      api_url,
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

    console.log("new Meal RATINGS --API:", newMealRating);
    return newMealRating;
  } catch (err) {
    console.log(err);
  }
}
