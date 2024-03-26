import axios from "axios";

axios.defaults.withCredentials = true;

export async function postRatedMeal(mealId, rating, feedback) {
  try {
    const res = await axios.post(
      "/ratedmeals",
      {
        meal: mealId,
        rating: rating,
        feedback: feedback,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const response = res.data.data;

    // console.log("new First Time POST in rateMead collection:", res.data.data);

    return response;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE(PUT) - Rated MEAL EXISTING
export async function updateRatedMeal(ratedId, rating, newFeedback) {
  try {
    const response = await axios.put(
      `/ratedmeals/ratedmeal/${ratedId}`,
      {
        rating: rating,
        feedback: newFeedback,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // console.log("my API after Updating in Rated Meal :", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
