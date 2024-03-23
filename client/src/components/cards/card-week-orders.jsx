import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { MealContext } from "../../services/context/MealsContext";
import { postRatedMeal, updateRatedMeal } from "../../callAPI/RatedMealsApi";
import { ratingIdentity, ratingUpdation } from "../../callAPI/RatingsApi";

import { recallAllRatingAndUpdateMeal } from "../ratings/ratingsFunc/ratingsFinalFunction";

import RatingsForm from "../ratings/RatingsForm";
import getCookies from "../cookies/GetCookies";

import "./card-week-orders.css";

const MiniCardWeekOrders = ({ meal }) => {
  const {
    state: { openTagRatings, user },
  } = useContext(MealContext);

  const [isRatingOPen, setIsRatingOpen] = useState(false);

  const mealRef = useRef(null);

  const operativeTaskRatings = useCallback(async (e) => {
    const mealId = await handleNewRatings(e);

    const updationMeal = await recallAllRatingAndUpdateMeal(mealId);
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
      //create the identity Rating ith POST in Rating collection
      const ratingTakePlace = await ratingIdentity(
        userId,
        triggeredRatedMealId
      );

      handleRatings(ratingTakePlace);
    } else {
      await submitRatedMealAndUpdateRatings(
        mealId,
        rating,
        feedback,
        entireRatedMeals
      );
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
    console.log("opening Ratings Form week day");
  }, [isRatingOPen]);

  return (
    <li className="day_dish_recall">
      <div className="dish_table">
        <div className="dish_sub_operation">
          <div>
            <p>
              Notes : <span>{meal.ratings} </span>
            </p>
          </div>
          <div className="brief_overview_meal">
            <img
              src={meal.image}
              className="dish_order_img"
              alt="oops overview"
            />

            <p className="dish_order_desc">Description: {meal.origin}</p>
          </div>
        </div>
        <div className="dish_topic">
          <p>{meal.name}</p>
          <p>
            <span className="number_order">{meal.quantity}</span>
            <span>: Ordered</span>
          </p>
        </div>
        <div className="recap_feedback" data-meal={meal.id} ref={mealRef}>
          <p className="send_ratings" onClick={(e) => manageRatingTask(e)}>
            Ratings
          </p>
          <p className="send_feedback" onClick={(e) => manageRatingTask(e)}>
            Feedback
          </p>
        </div>
        {isRatingOPen && (
          <RatingsForm
            operativeTaskRatings={operativeTaskRatings}
            setIsRatingOpen={setIsRatingOpen}
            isRatingOPen={isRatingOPen}
          />
        )}
      </div>
    </li>
  );
};

function CardWeekOrders({ ...props }) {
  if (props) {
    const ordersInside = props.ordersSpecs;

    const mealItemsKeys = Object.keys(ordersInside);

    return mealItemsKeys.map((key, i) => (
      <MiniCardWeekOrders key={i} meal={ordersInside[key]} />
    ));
  }
}

export default CardWeekOrders;
