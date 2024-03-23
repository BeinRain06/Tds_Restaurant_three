import React, { useState, useContext, useCallback, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { fetchOrdersWeek } from "../../callAPI/OrdersApi";
import { getThisUserRatings } from "../../callAPI/RatingsApi";
import { MealContext } from "../../services/context/MealsContext";
import getCookies from "../cookies/GetCookies";

import "./welcome.css";

function Welcome() {
  const { handleOrdersWeek, handleOrdersDay, handleRatings } =
    useContext(MealContext);

  const cookies = getCookies();
  const userId = cookies.userId;

  const OrdersWeekSet = useCallback(async () => {
    //  Updating Orders List Week!

    const ordersFetch = await fetchOrdersWeek(userId);

    let newOrdersFetchWeek;
    let newOrdersFetchDay;

    console.log("ordersFetch:", ordersFetch);

    if (ordersFetch.length !== 0) {
      ordersFetch?.map((eltOrder, i) => {
        const indElt = +moment(eltOrder.dateOrdered).format("d");
        newOrdersFetchWeek = { ...newOrdersFetchWeek, [indElt]: eltOrder };

        if (indElt === +moment().format("d")) {
          newOrdersFetchDay = { ...newOrdersFetchDay, [indElt]: eltOrder };
        }
      });

      handleOrdersWeek(newOrdersFetchWeek);
      handleOrdersDay(newOrdersFetchDay);
    } else {
      const emptyObj = {};
      handleOrdersWeek(emptyObj);
      handleOrdersDay(emptyObj);
    }
  }, []);

  const grabRatings = useCallback(async () => {
    const wholeRatedMeals = await getThisUserRatings(userId);

    handleRatings(wholeRatedMeals);
  }, []);

  const styleNavLink = ({ isActive }) => {
    const styleOne = {
      padding: "0.15rem 0.65rem",
      color: "#fff",
      backgroundColor: "#1c7e4d",
      fontSize: "14px",
      border: "2px solid #fff",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const styleTwo = {
      padding: "0.15rem 0.65rem",
      color: "#fff",
      backgroundColor: "purple",
      fontSize: "14px",
      border: "2px solid #fff",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    {
      return isActive ? styleTwo : styleOne;
    }
  };

  useEffect(() => {
    if (userId !== undefined) {
      OrdersWeekSet();
      grabRatings();
    }
  }, []);

  return (
    <div className="welcome_wrapper">
      <ul className="welcome_content">
        <li>
          <p>
            Welcome To our Restaurant <span className="logo_brand">TDS</span> a
            new vibe for your Meals
          </p>
        </li>
        <li className="gate_bridge">
          {/* <button type="button" className="open_door_home">
            see home
          </button> */}
          <NavLink to="/home" style={styleNavLink}>
            see home
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Welcome;
