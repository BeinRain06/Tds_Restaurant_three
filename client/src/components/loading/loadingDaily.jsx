import React, { useContext, useEffect, useState, useCallback } from "react";
import { MealContext } from "../../services/context/MealsContext";
import { DailyContext } from "../../services/context/DailyContext";

import { dailyActions } from "../../services/redux/createslice/DailySplice";

import {
  lastActiveDay_section,
  mondayMenu_section,
  arrayDayWeeK_section,
} from "../../services/redux/createslice/DailySplice";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../../callAPI/MealsApi";
import HomeFetchingError from "../../services/errorBoundary/home_error_boundary";
import moment from "moment";
import "./loading.css";

function LoadingDaily() {
  const { handleMeals } = useContext(MealContext);

  const {
    state: { lastActiveDay, mondayMenu, arrayDayWeeK },
    handleLastActiveDay,
    handleActiveDayWeek,
    handleMondayMenu,
    handleSelectedDesserts,
    handleSelectedMeats,
    handleSelectedSeafoods,
    handleSelectedVegetarians,
  } = useContext(DailyContext);

  const [hasError, setHasError] = useState(false);

  const fetchData = async (indexChange) => {
    const meals = await getMeals();

    handleMeals(meals);

    console.log("show me meals:", meals);

    let desData = [];
    let vegData = [];
    let seaData = [];
    let meatsData = [];

    if (meals) {
      /*   handleMeals(meals); */
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

    /* handleSeaFoods(seaData);
    handleDesserts(desData);
    handleMeats(meatsData);
    handleVegetarians(vegData); */

    /*    console.log("result:", result); */

    return { meatsData, seaData, vegData, desData, indexChange };
  };

  const matchSelectMeals = async (callback) => {
    if (callback === null) {
      return;
    }

    let { meatsData, seaData, vegData, desData, indexChange } = await callback;

    let mySet = new Set();

    mySet.add("Meats").add("Seafoods").add("Vegetarians").add("Desserts");

    let indA1 = meatsData.length / 2;
    let indA2 = meatsData.length - meatsData.length / 2 + 1;

    let indA3 = desData.length / 2;
    let indA4 = desData.length - desData.length / 2 + 1;

    let tmpArr1 = [],
      tmpArr2 = [],
      tmpArr = [];

    mySet.forEach(async (item, i) => {
      if (item === "Meats" || item === "Seafoods" || item === "Vegetarians") {
        let count = 4;
        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
        indA1 = meatsData.length / 2;
        indA2 = meatsData.length - meatsData.length / 2 + 1;

        for (let i = 0; i <= indA1; i++) {
          item === "Meats" && tmpArr1.push(meatsData[i]);
          item === "Seafoods" && tmpArr1.push(seaData[i]);
          item === "Vegetarians" && tmpArr1.push(vegData[i]);
        }

        for (let i = indA2; i < meatsData.length; i++) {
          item === "Meats" && tmpArr2.push(meatsData[i]);
          item === "Seafoods" && tmpArr2.push(seaData[i]);
          item === "Vegetarians" && tmpArr2.push(vegData[i]);
        }

        do {
          let a = Math.floor(Math.random() * (indA1-- + 1));
          let b = Math.floor(Math.random() * (indA2-- + 1));
          tmpArr1.splice(a, 1);
          tmpArr2.splice(b, 1);
          count--;
        } while (count > 0);

        console.log("tmpArr1 & tmpArr2:", tmpArr1, tmpArr2);

        tmpArr = tmpArr1.concat(tmpArr2);

        item === "Meats" && (await handleSelectedMeats(tmpArr));
        item === "Seafoods" && (await handleSelectedSeafoods(tmpArr));

        item === "Vegetarians" && (await handleSelectedVegetarians(tmpArr));

        item === "Meats" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, meats: tmpArr };
          });

        item === "Seafoods" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, seafoods: tmpArr };
          });

        item === "Vegetarians" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, vegetarians: tmpArr };
          });

        item === "Seafoods" &&
          indexChange === 3 &&
          dispatch(
            dailyActions.handleMondayMenu((prev) => {
              return { ...prev, seafoods: tmpArr };
            })
          );

        item === "Vegetarians" &&
          indexChange === 3 &&
          dispatch(
            dailyActions.handleMondayMenu((prev) => {
              return { ...prev, vegetarians: tmpArr };
            })
          );

        /* console.log("tmpArr1: 121", tmpArr1);
        console.log("tmpArr2: 122", tmpArr2);
        console.log("tmpArr: 123", tmpArr);

        
 */

        indA1 = meatsData.length / 2;
        indA2 = meatsData.length - meatsData.length / 2 + 1;
        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
      } else if (item === "Desserts") {
        let count = 2;
        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
        indA3 = desData.length / 2;
        indA4 = desData.length - desData.length / 2 + 1;

        for (let i = 0; i <= indA3; i++) {
          item === "Desserts" && tmpArr1.push(desData[i]);
        }

        for (let i = indA4; i < desData.length; i++) {
          item === "Desserts" && tmpArr2.push(desData[i]);
        }

        do {
          let a = Math.floor(Math.random() * (indA3-- + 1));
          let b = Math.floor(Math.random() * (indA4-- + 1));
          tmpArr1.splice(a, 1);
          tmpArr2.splice(b, 1);
          count--;
        } while (count > 0);

        console.log("tmpArr1 & tmpArr2:", tmpArr1, tmpArr2);

        tmpArr = tmpArr1.concat(tmpArr2);

        item === "Desserts" && (await handleSelectedDesserts(tmpArr));

        item === "Desserts" &&
          indexChange === 3 &&
          handleMondayMenu((prev) => {
            return { ...prev, desserts: tmpArr };
          });

        /* item === "Desserts" &&
          (await dispatch(dailyActions.handleSelectedDesserts(tmpArr)));

        item === "Desserts" &&
          indexChange === 3 &&
          dispatch(
            dailyActions.handleMondayMenu((prev) => {
              return { ...prev, desserts: tmpArr };
            })
          ); */

        /*    console.log("tmpArr1: 121", tmpArr1);
        console.log("tmpArr2: 122", tmpArr2);
        console.log("tmpArr: 123", tmpArr); */
        indA3 = desData.length / 2;
        indA4 = desData.length - desData.length / 2 + 1;
        tmpArr1 = [];
        tmpArr2 = [];
        tmpArr = [];
      }
    });
  };

  const updateArrayAndActiveDay = () => {
    arrayDayWeeK.map(async (newDay, i) => {
      if (newDay.day === moment().format("ddd")) {
        let newActiveDay = {
          day: moment().format("ddd"),
          isActive: true,
          index: i,
        };

        if (i === 3) {
        }

        const prevIndex = lastActiveDay.index;
        const nextIndex = newActiveDay.index;
        let newChange = {
          ...arrayDayWeeK,
          [prevIndex]: { ...arrayDayWeeK[prevIndex], isActive: false },
          [nextIndex]: { ...arrayDayWeeK[nextIndex], isActive: true },
        };

        handleLastActiveDay(newActiveDay);
        handleActiveDayWeek(newChange);

        /* dispatch(dailyActions.handleLastActiveDay(newActiveDay));
        dispatch(dailyActions.handleActiveDayWeek(newChange)); */
      }
    });
  };

  const grabAllTypesMeals = async () => {
    if (
      lastActiveDay.day === moment().format("ddd") &&
      lastActiveDay.day === "Mon"
    ) {
      console.log("mondayMenu :", Array.from(mondayMenu).length);
      if (Array.from(mondayMenu).length === 0) {
        let indexChange = 0;
        const result = await fetchData(indexChange);

        return result;
      } else {
        await selectMyMealsMenu();

        const result = null; // already set menu
        return result;

        /*  setTimeout(async () => {
          await dispatch(dailyActions.handleSelectedMeats(mondayMenu.meats));
          await dispatch(
            dailyActions.handleSelectedSeafoods(mondayMenu.seafoods)
          );
          await dispatch(
            dailyActions.handleSelectedVegetarians(mondayMenu.vegetarians)
          );
          await dispatch(
            dailyActions.handleSelectedDesserts(mondayMenu.desserts)
          );
        }, 3000); */
      }
    } else if (lastActiveDay.day !== moment().format("ddd")) {
      let indexChange = lastActiveDay.index;
      updateArrayAndActiveDay();

      const result = await fetchData(indexChange);
      console.log("result data:", result);

      return result;
    }
  };

  const selectMyMealsMenu = async () => {
    return await new Promise((resolve) => {
      handleSelectedMeats(mondayMenu.meats);
      handleSelectedSeafoods(mondayMenu.seafoods);
      handleSelectedVegetarians(mondayMenu.vegetarians);
      handleSelectedDesserts(mondayMenu.desserts);
      setTimeout(resolve, 2000);
    });
  };

  const resolveSelectedMeals = useCallback(async () => {
    const grabbed = await grabAllTypesMeals();
    return await new Promise((resolve) => {
      matchSelectMeals(grabbed);
      console.log("Successfully Meals Selections... !");
      setTimeout(resolve, 3000);
    });
  }, []);

  useEffect(() => {
    try {
      resolveSelectedMeals();
    } catch (err) {
      console.log(err);
      setHasError(true);
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

export default LoadingDaily;
