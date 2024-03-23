import { updateMealScoreRating } from "../../../callAPI/RatingsApi";
import { getAllRatings } from "../../../callAPI/RatingsApi";

export const recallAllRatingAndUpdateMeal = async (mealId) => {
  const allRatings = await getAllRatings();

  console.log("all ratings:", allRatings);

  const allRatedMeals = allRatings.map((ratingsUnit) => ratingsUnit.ratedMeals);
  let entireRatedMealsObj = { ...allRatedMeals };

  const entireRatedMealskeys = Object.keys(entireRatedMealsObj);

  console.log("entireRatedMealskeys :", entireRatedMealskeys);

  const resultArrRating = entireRatedMealskeys.reduce((acc, val, i) => {
    const insideArr = entireRatedMealsObj[val];
    console.log("insideArr:", insideArr);
    const filterArr = insideArr.filter((item) => item.meal === mealId);

    console.log("filterArr:", filterArr);
    if (filterArr.length !== 0) {
      const rating = filterArr[0].rating;
      const newAcc = [...acc, rating];
      return newAcc;
    } else {
      return acc;
    }
  }, []);

  console.log("resultArrRating:", resultArrRating);

  const newRatingSide = await updateMealScoreRating(mealId, resultArrRating); // <= HERE Have Some Error
  // with CROSS ORIGIN REQUEST BLOCKED=>

  console.log("the new Meals data after Ratings:", newRatingSide);
};
