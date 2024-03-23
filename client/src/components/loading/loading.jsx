import React, { useState, useContext, useEffect } from "react";
import { MealContext } from "../../services/context/MealsContext.jsx";
import { mealActions } from "../../services/redux/createslice/MealSplice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../../callAPI/MealsApi.jsx";
import HomeFetchingError from "../../services/errorBoundary/home_error_boundary.jsx";
import "./loading.css";

function Loading() {
  // const dispatch = useDispatch();
  const {
    handleMeals,
    handleDesserts,
    handleMeats,
    handleSeaFoods,
    handleVegetarians,
    handleWelcome,
  } = useContext(MealContext);

  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    const result = await getMeals();

    setTimeout(() => {
      console.log("fetching course");
    }, 2500);

    const meals = result;
    let desData = [];
    let vegData = [];
    let seaData = [];
    let meatsData = [];

    if (meals) {
      handleMeals(meals);

      await meals.map((item, i) => {
        if (item.category._id === import.meta.env.VITE_ID_SEAFOODS) {
          seaData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_MEATS) {
          meatsData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_VEGETARIANS) {
          vegData.push(item);
        } else if (item.category._id === import.meta.env.VITE_ID_DESSERTS) {
          desData.push(item);
        }
      });
    }

    handleSeaFoods(seaData);
    handleDesserts(desData);
    handleMeats(meatsData);
    handleVegetarians(vegData);

    /*  dispatch(mealActions.handleSeaFoods(seaData));
    dispatch(mealActions.handleDesserts(desData));
    dispatch(mealActions.handleMeats(meatsData));
    dispatch(mealActions.handleVegetarians(vegData)); */

    console.log("result:", result);
  };

  useEffect(() => {
    try {
      const insureFetchData = async () => {
        await fetchData();
        await handleWelcome(false);
        /*  dispatch(mealActions.handleWelcome(false)); */
      };

      insureFetchData();

      console.log("Fetching data ...");
    } catch (err) {
      console.log(err);
      if (err) setHasError(err.message);
    }
  }, []);

  if (hasError) return <HomeFetchingError error={hasError} />;

  return (
    <div className="loading_wrapper">
      <ul className="loading_content">
        <li>
          <span className="loading_text">Loading</span>
        </li>
        <li className="classic_circ">
          <span className=" circ_red"></span>
          <span className=" circ_green"></span>
          <span className=" circ_blue"></span>
        </li>
      </ul>
    </div>
  );
}

export default Loading;
