import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { MealContext } from "../../services/context/MealsContext";

import moment from "moment";

import { postRatedMeal, updateRatedMeal } from "../../callAPI/RatedMealsApi";
import { ratingIdentity, ratingUpdation } from "../../callAPI/RatingsApi";

import { recallAllRatingAndUpdateMeal } from "../ratings/ratingsFunc/ratingsFinalFunction";

import getCookies from "../cookies/GetCookies";

import RatingsForm from "../ratings/RatingsForm";
import "./card-day-orders.css";

export const CardDayOrder = ({ id, meal }) => {
  const {
    state: { meals, ratings },
    handleRatings,
  } = useContext(MealContext);

  const [isRatingOPen, setIsRatingOpen] = useState(false);

  const mealRef = useRef(null);

  const operativeTaskRatings = useCallback(async (e) => {
    const mealId = await handleNewRatings(e);

    const updationMeal = await recallAllRatingAndUpdateMeal(mealId);

    setIsRatingOpen(false);
  }, []);

  const manageRatingTask = (e) => {
    e.preventDefault();
    setIsRatingOpen(true);
  };

  const validatorRating = (userId, rating) => {
    if (userId === undefined) {
      alert("Can't rate for the moment. Please Try again Later!");
      return;
    }

    if (+rating <= 1 || +rating > 5) {
      alert("can't rate less than 1 or more than 5 ");
      return;
    } else if (rating === "" || typeof +rating !== "number") {
      alert("miss rating value! between 1 and 5 ");
    }
  };

  const handleNewRatings = async (e) => {
    e.preventDefault();
    console.log("e target New Ratings:", e.target);

    const mealId = mealRef.current.getAttribute("data-meals");

    let rating = e.target.elements.rating.value;
    let feedback = e.target.elements.feedback.value;

    const cookies = getCookies();
    const userId = cookies.userId;

    validatorRating(userId, rating);

    let entireRatedMeals = ratings.ratedMeals;

    if (entireRatedMeals === undefined) {
      //create the identity
      //POST in RatedMeal collection
      // POST in Rating collection
      const newRatedMeal = await postRatedMeal(mealId, rating, feedback);

      console.log("newRatedMeal:", newRatedMeal);

      const ratingTakePlace = await ratingIdentity(userId, newRatedMeal.id);

      console.log("ratings take place:", ratingTakePlace);

      handleRatings(ratingTakePlace);
    } else {
      const submitUpdate = await submitRatedMealAndUpdateRatings(
        mealId,
        rating,
        feedback,
        entireRatedMeals
      );

      console.log("submit update:", submitUpdate);
    }

    return mealId;
  };

  const submitRatedMealAndUpdateRatings = async (
    mealId,
    rating,
    feedback,
    entireRatedMeals
  ) => {
    const isAlreadyRated = entireRatedMeals.findIndex(
      (item, i) => item.meal === mealId
    );
    if (isAlreadyRated !== -1) {
      //updateRated Meal

      const newFeedback =
        feedback !== "" ? feedback : entireRatedMeals[isAlreadyRated].feedback;

      const considerUpdate = {
        ...ratings,
        [ratedMeals]: {
          ...ratedMeals,
          [isAlreadyRated]: {
            ...ratedMeals[isAlreadyRated],
            rating: rating,
            feedback: newFeedback,
            dateMention: moment().format("Do MMMM, YYYY"),
          },
        },
      };

      handleRatings(considerUpdate);

      const itemRated = entireRatedMeals.find(
        (item, i) => item.meal === mealId
      );
      const ratedId = itemRated._id;
      const weUpdatingRatedMeal = await updateRatedMeal(
        ratedId,
        rating,
        newFeedback
      );

      console.log("udated Rated Meal:", weUpdatingRatedMeal);
    } else {
      //postRated Meal
      const triggeredRatedMeal = await postRatedMeal(mealId, rating, feedback);

      // update Rating
      const triggeredRatedMealId = triggeredRatedMeal._id;

      let ratedIds = ratings.ratedMeals.map((item) => item._id);

      ratedIds = [...ratedIds, triggeredRatedMealId];

      const myUpdate = await ratingUpdation(ratings._id, ratedIds);

      handleRatings(myUpdate);
    }
  };

  useEffect(() => {
    console.log("opening Ratings Form in day");
  }, [isRatingOPen]);

  return (
    <li key={id} className="day_dish_recall">
      <p className="title_template_orders">Day Orders</p>
      <div className="dish_tab_rec">
        <div className="dish_country">{meal.name}</div>
        <div className="dish_sub_operation">
          <div className="dish_topic">
            <p>
              <span className="number_order">{meal.quantity}</span>
              <span>: Orders</span>
            </p>
          </div>
          <div className="brief_overview_meal">
            <img
              src={meal.image}
              className="dish_order_img"
              alt="oops overview"
            />
            <div className="recap_feed" data-meals={id} ref={mealRef}>
              <button
                id={id}
                className="send_ratings btn_ratings"
                onClick={(e) => manageRatingTask(e)}
              >
                Ratings
              </button>
            </div>
          </div>
          <p className="dish_order_rec">Description: {meal.origin}</p>
          {isRatingOPen && (
            <RatingsForm
              operativeTaskRatings={operativeTaskRatings}
              setIsRatingOpen={setIsRatingOpen}
              isRatingOPen={isRatingOPen}
            />
          )}
        </div>
      </div>
    </li>
  );
};

function CardDayOrders({ ordersSpecs }) {
  //display DOM
  return (
    <>
      {Object.keys(ordersSpecs).map((key, i) => {
        console.log("ordersSpecs :", ordersSpecs);
        console.log("ordersSpecs Meal :", ordersSpecs[key]);

        const meal = ordersSpecs[key];
        const id = meal.id;

        return <CardDayOrder id={id} meal={meal} />;
      })}
    </>
  );
}

export default CardDayOrders;
