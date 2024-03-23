import axios from "axios";

axios.defaults.withCredentials = true;

export async function postRatedMeal(mealId, rating, feedback) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratedmeals`;

    const res = await axios.post(
      api_url,
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

    console.log("new First Time POST in rateMead collection:", res.data.data);

    return response;
  } catch (err) {
    console.log(err);
  }
}

//UPDATE(PUT) - Rated MEAL EXISTING
export async function updateRatedMeal(ratedId, rating, newFeedback) {
  try {
    let api_url = `http://localhost:5000/api/delivery/ratedmeals/ratedmeal/${ratedId}`;

    const response = await axios.put(
      api_url,
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

    console.log("my API after Updating in Rated Meal :", response);

    return response;
  } catch (err) {
    console.log(err);
  }
}
