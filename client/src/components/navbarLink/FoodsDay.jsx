import React, { useContext, useState, useEffect, useRef } from "react";
import moment from "moment";
import Loading from "../loading/loading";

import { DailyContext } from "../../services/context/DailyContext";

import { MealContext } from "../../services/context/MealsContext";

import LoadingDaily from "../loading/loadingDaily";
import Button from "../button/button-shape";
import "./FoodsDay.css";

function FoodsDay() {
  const { handleWelcome } = useContext(MealContext);

  const {
    state: {
      selectMeats,
      selectSeafoods,
      selectVegetarians,
      selectDesserts,
      endThisVar,
    },
    handleEndThisVar,
  } = useContext(DailyContext);

  const [loading, setLoading] = useState(true);

  const [choosingMeals, setChoosingMeals] = useState(selectMeats);

  const mobMealRef = useRef(null);

  const desMealRef = useRef(null);

  const topMiniRef = useRef(null);

  let mySet = new Set();

  mySet.add("Meats").add("Seafoods").add("Vegetarians").add("Desserts");

  const selectSquareFoods = async (e) => {
    console.log(e.target.parentElement);

    /* setLoading(true); */
    let mealCategory;

    if (e.target.parentElement.getAttribute("data-meal") === "Meats") {
      mealCategory = "Meats";

      /* setTimeout(async () => {
        await handleEndThisVar("Meals");
      }, 3000); */
    } else if (
      e.target.parentElement.getAttribute("data-meal") === "Seafoods"
    ) {
      mealCategory = "Seafoods";
      /*  setTimeout(async () => {
        await handleEndThisVar("Seafoods");
      }, 3000); */
    } else if (
      e.target.parentElement.getAttribute("data-meal") === "Vegetarians"
    ) {
      mealCategory = "Vegetarians";
      /*   setTimeout(async () => {
        await handleEndThisVar("Vegetarians");
      }, 3000); */
    } else if (
      e.target.parentElement.getAttribute("data-meal") === "Desserts"
    ) {
      mealCategory = "Desserts";
      /* setTimeout(async () => {
        await handleEndThisVar("Desserts");
      }, 3000); */
    }

    handleEndThisVar({ mealCategory });

    // dispatch(dailyActions.handleEndThisVar({ mealCategory }));

    console.log("meal meal cate", mealCategory);

    const myChoiceRender = suitRenderMeals(mealCategory);
    setChoosingMeals(myChoiceRender);
  };

  const removeLoading = (timer) => {
    if (loading) {
      setTimeout(async () => {
        console.log("Loading ...");

        await setLoading(false);
      }, timer);
    }
  };

  const suitRenderMeals = (mealCategory) => {
    console.log("mealCategory:", mealCategory);
    console.log("selectSeafoods:", selectSeafoods);

    if (mealCategory === "Meats") {
      return selectMeats;
    } else if (mealCategory === "Seafoods") {
      return selectSeafoods;
    } else if (mealCategory === "Vegetarians") {
      return selectVegetarians;
    } else if (mealCategory === "Desserts") {
      return selectDesserts;
    }
  };

  const focusMeal = (e) => {
    console.log("on focus e.target :", e.target.closest(".min_showcase"));

    const mealIndex = e.target
      .closest(".min_showcase")
      .getAttribute("data-mealindex");

    const arrMob = Array.from(mobMealRef.current.children);

    const arrDes = Array.from(desMealRef.current.children);

    const ulMob = Array.from(topMiniRef.current.children);

    ulMob.map((item, i) => {
      if (item.getAttribute("data-mealindex") === mealIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    arrMob.map((item, i) => {
      if (item.getAttribute("data-mealindex") === mealIndex) {
        item.classList.add("speed_focus");
      } else {
        item.classList.remove("speed_focus");
      }
    });

    arrDes.map((item, i) => {
      if (item.getAttribute("data-mealindex") === mealIndex) {
        console.log("item,:", item);
        item.classList.add("speed_focus");
      } else {
        item.classList.remove("speed_focus");
      }
    });

    console.log("mobMealRef", mobMealRef);
    console.log("desMealRef", desMealRef);
  };

  const removeFocusMeal = (e) => {
    console.log(e.target);
    const arrMob = Array.from(mobMealRef.current.children);

    const arrDes = Array.from(desMealRef.current.children);

    const ulMob = Array.from(topMiniRef.current.children);

    if (!e.target.classList.contains("min_showcase")) {
      ulMob.map((item, i) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });
    }

    if (!e.target.classList.contains("each_day_dish")) {
      arrMob.map((item, i) => {
        if (item.classList.contains("speed_focus")) {
          console.log("item,:", item);
          item.classList.remove("speed_focus");
        }
      });

      arrDes.map((item, i) => {
        if (item.classList.contains("speed_focus")) {
          console.log("item,:", item);
          item.classList.remove("speed_focus");
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
      handleWelcome(false);
    }, 3000);

    console.log("selectMeats:", selectMeats);
  }, []);

  useEffect(() => {
    console.log(`choose to see new Meals`);
  }, [choosingMeals]);

  /* useEffect(() => {
    console.log("1--2--3 update under e.target square");
  }, [endThisVar]); */

  return (
    <main className="welcome_day">
      <div className="day_page_wrapper">
        <p className="gen_title_day title_page">Day's Menu</p>
        <section id="meats_matching" className="foods_matching">
          <div className="template_food_day">
            <p className="gen_title_day title_category">Meats</p>
            <ul className="square_indicator">
              <li
                key="meats"
                className="square_rhytmic"
                data-meal="Meats"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="seafoods"
                className="square_rhytmic"
                data-meal="Seafoods"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="vegetarians"
                className="square_rhytmic"
                data-meal="Vegetarians"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
              <li
                key="desserts"
                className="square_rhytmic"
                data-meal="Desserts"
                onClick={(e) => selectSquareFoods(e)}
              >
                <div className="square_box"></div>
              </li>
            </ul>
            {!loading ? (
              <>
                <ul className="on_top_mini" ref={topMiniRef}>
                  {endThisVar === "Meats"
                    ? selectMeats.map((item, i) => {
                        return (
                          <li
                            key={item._id}
                            className="min_showcase"
                            data-mealindex={item._id}
                            onClick={(e) => focusMeal(e)}
                          >
                            <div className="mini_meal_img">
                              <div className="box_mini_img">
                                <p className="side_name_img">{item.name}</p>
                              </div>
                              <img
                                src={item.image}
                                alt="no_img_here"
                                className="img_day_top"
                              />
                            </div>
                          </li>
                        );
                      })
                    : choosingMeals.map((item, i) => {
                        return (
                          <li
                            key={item._id}
                            className="min_showcase"
                            data-mealindex={item._id}
                            onClick={(e) => focusMeal(e)}
                          >
                            <div className="mini_meal_img">
                              <div className="box_mini_img">
                                <p className="side_name_img">{item.name}</p>
                              </div>
                              <img
                                src={item.image}
                                alt="no_img_here"
                                className="img_day_top"
                              />
                            </div>
                          </li>
                        );
                      })}
                </ul>
                <div
                  className=" showcase_mobile_wrapper showcase_dish "
                  onClick={(e) => removeFocusMeal(e)}
                >
                  <ul className="listing_mob_dish" ref={mobMealRef}>
                    {endThisVar === "Meats"
                      ? selectMeats.map((meal, i) => {
                          return (
                            <li
                              key={meal._id}
                              className="each_day_dish"
                              data-mealindex={meal._id}
                            >
                              <div className="show_ray_wrapper">
                                <div>
                                  <div className="show_content_dish">
                                    <div className="dish_frame">
                                      <img
                                        src={meal.image}
                                        className="dish_img"
                                        alt="show dish missing"
                                      />
                                      <p className="dish_name">{meal.name}</p>
                                    </div>
                                    <div className="centralize_info_dish">
                                      <div className="dish_desc">
                                        <div className="dish_mini_desc">
                                          <p className="title_desc">
                                            Description
                                          </p>
                                          <p className="description_dish">
                                            {meal.longDesc}
                                          </p>
                                        </div>
                                        <div className="dish_bill">
                                          <p className="dish_price">
                                            ${meal.price}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="dish_order">
                                        <div className="dish_ingredients flex-column">
                                          <p className="title_ingredients">
                                            Ingredients
                                          </p>
                                          <p className="some_ingredients">
                                            {meal.ingredients}
                                          </p>
                                        </div>
                                        <Button
                                          mealid={meal._id}
                                          mealname={meal.name}
                                          mealprice={meal.price}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      : choosingMeals.map((meal, i) => {
                          return (
                            <li
                              key={meal._id}
                              className="each_day_dish"
                              data-mealindex={meal._id}
                            >
                              <div className="show_ray_wrapper">
                                <div>
                                  <div className="show_content_dish">
                                    <div className="dish_frame">
                                      <img
                                        src={meal.image}
                                        className="dish_img"
                                        alt="show dish missing"
                                      />
                                      <p className="dish_name">{meal.name}</p>
                                    </div>
                                    <div className="centralize_info_dish">
                                      <div className="dish_desc">
                                        <div className="dish_mini_desc">
                                          <p className="title_desc">
                                            Description
                                          </p>
                                          <p className="description_dish">
                                            {meal.longDesc}
                                          </p>
                                        </div>
                                        <div className="dish_bill">
                                          <p className="dish_price">
                                            ${meal.price}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="dish_order">
                                        <div className="dish_ingredients flex-column">
                                          <p className="title_ingredients">
                                            Ingredients
                                          </p>
                                          <p className="some_ingredients">
                                            {meal.ingredients}
                                          </p>
                                        </div>
                                        <Button
                                          mealid={meal._id}
                                          mealname={meal.name}
                                          mealprice={meal.price}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                  </ul>
                </div>

                <div className="showcase_wrapper_desktop">
                  <div
                    className="showcase_center_wrap flex-row"
                    onClick={(e) => removeFocusMeal(e)}
                  >
                    <div className="this_day">
                      <p className="actual_date">
                        <span className="calling">
                          This {moment().format("dddd")} ,
                        </span>
                        <span
                          className="underlined_day_part"
                          style={{ textDecoration: "underline" }}
                        >
                          {moment().format("MMMM Do YYYY")}
                        </span>
                      </p>
                    </div>
                    <ul className="showcase_content_desktop" ref={desMealRef}>
                      {endThisVar === "Meats"
                        ? selectMeats.map((meal, i) => {
                            return (
                              <li
                                key={meal._id}
                                className="each_day_dish flex-row"
                                data-mealindex={meal._id}
                              >
                                <div className="showcase_dish">
                                  <div className="show_ray_wrapper">
                                    <div>
                                      <div>
                                        <div className="show_content_dish">
                                          <div className="dish_frame">
                                            <img
                                              src={meal.image}
                                              className="dish_img"
                                              alt="show dish missing"
                                            />
                                            <p className="dish_name">
                                              {meal.name}
                                            </p>
                                          </div>
                                          <div className="dish_desc">
                                            <div className="dish_mini_desc">
                                              <p className="title_desc">
                                                Description
                                              </p>
                                              <p className="description_dish">
                                                {meal.longDesc}
                                              </p>
                                            </div>
                                            <div className="dish_bill">
                                              <p className="dish_price">
                                                ${meal.price}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="dish_order">
                                            <div className="dish_ingredients flex-column">
                                              <p className="title_ingredients">
                                                Ingredients
                                              </p>
                                              <p className="some_ingredients">
                                                {meal.ingredients}
                                              </p>
                                            </div>
                                            <Button
                                              mealid={meal._id}
                                              mealname={meal.name}
                                              mealprice={meal.price}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        : choosingMeals.map((meal, i) => {
                            return (
                              <li
                                key={meal._id}
                                className="each_day_dish flex-row"
                                data-mealindex={meal._id}
                              >
                                <div className="showcase_dish">
                                  <div className="show_ray_wrapper">
                                    <div>
                                      <div>
                                        <div className="show_content_dish">
                                          <div className="dish_frame">
                                            <img
                                              src={meal.image}
                                              className="dish_img"
                                              alt="show dish missing"
                                            />
                                            <p className="dish_name">
                                              {meal.name}
                                            </p>
                                          </div>
                                          <div className="dish_desc">
                                            <div className="dish_mini_desc">
                                              <p className="title_desc">
                                                Description
                                              </p>
                                              <p className="description_dish">
                                                {meal.longDesc}
                                              </p>
                                            </div>
                                            <div className="dish_bill">
                                              <p className="dish_price">
                                                ${meal.price}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="dish_order">
                                            <div className="dish_ingredients flex-column">
                                              <p className="title_ingredients">
                                                Ingredients
                                              </p>
                                              <p className="some_ingredients">
                                                {meal.ingredients}
                                              </p>
                                            </div>
                                            <Button
                                              mealid={meal._id}
                                              mealname={meal.name}
                                              mealprice={meal.price}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                    </ul>
                    <div className="this_day"></div>
                  </div>
                </div>
              </>
            ) : (
              <LoadingDaily />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodsDay;
