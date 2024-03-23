import React, { useState, useEffect, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import { ValidationContext } from "../../services/context/ValidationContext";

import ErrorWarning from "../process_validation/styledComponents/MsgError";

import "./Layout.css";

/* this Layout component is mainly created to apply general css style  for to each link : day, favourites, order, events ... , it represents the div box of each NavLInk located in  Navigation.jsx*/

export const SquareItems = () => {
  const {
    state: { orderSpecsCurrent },
  } = useContext(TemplateContext);

  const styleSquare = {
    width: "18px",
    height: "18px",
    color: "#fff",
    backgroundColor: "#d6b95a",
    fontSize: " clamp(0.5rem,0.65rem,0.95rem)",
    marginLeft: "0.5rem",
    /*  verticalAlign: "center", */
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
  };

  useEffect(() => {
    console.log("Layout Count items!");
  }, [orderSpecsCurrent]);

  return (
    <>
      {orderSpecsCurrent.length !== 0 ? (
        <span style={styleSquare}>{orderSpecsCurrent.length}</span>
      ) : (
        <span></span>
      )}
    </>
  );
};

function Layout() {
  const {
    state: { welcome },
  } = useContext(MealContext);

  const {
    state: { forseen, messageError },
    handleForSeen,
    handleSectionName,
    handleMessageError,
  } = useContext(ValidationContext);

  const [valueInput, setValueInput] = useState("");

  const searchMealsFunction = (e) => {
    e.preventDefault();
    console.log("element e.target:", e.target);

    //ForSeen: True(to hit implemention in the future( ErrorWarning.jsx <== CALLED For That) )
    if (
      e.target.id === "search_btn" ||
      e.target.getAttribute("data-icon") === "magnifying-glass"
    ) {
      handleForSeen(true);
      handleMessageError("future process...");
      handleSectionName("searchMealsButton");
      /*  setTimeout(() => {
        handleMessageError("");
      }, 8000); */
    }
  };

  const handleSubString = (e) => {
    const newString = e.target.value;
    setValueInput(newString);
  };

  const styleNavLink = ({ isActive }) => {
    const styleOne = {
      padding: "0.15rem 0.5rem",
      color: "#333",
      backgroundColor: "#eee",
      fontSize: "12px",
      border: "1px solid transparent",
      borderRadius: "12px",
      textDecoration: "none",
      transition: "all 450ms ease-in-out",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const styleTwo = {
      padding: "0.15rem 0.5rem",
      color: "#fff",
      backgroundColor: "#1c7e4d",
      fontSize: "12px",
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
    console.log("This Feature will be implemented later ");
  }, [forseen]);

  useEffect(() => {
    console.log("1-2-3-4");
  }, [welcome]);

  return (
    <>
      {welcome ? (
        <main className="main_content">
          <Outlet />
        </main>
      ) : (
        <>
          <nav className="nav_menu">
            <ul className="space_brand">
              <li className="icon_menu_open">
                {/* <i className="fa-solid fa-bars"></i> */}
                <div className="logo_brand">
                  <span>T</span>
                  <span>D</span>
                  <span>S</span>
                </div>
              </li>
              <li className="name_brand">
                <span>Top</span>
                <span style={{ color: "#1c7e4d" }}>Dis</span>
                <span>hes</span>
              </li>
            </ul>
            <ul
              className="space_search"
              onClick={(e) => searchMealsFunction(e)}
            >
              <li className="field_input">
                <input
                  type="text"
                  name="meal"
                  id="meal_input"
                  className="meal_input"
                  placeholder="search Meal"
                  onChange={(e) => handleSubString(e)}
                />
              </li>
              <li id="search_btn" className="search_btn">
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ color: "#e1ebe6" }}
                ></i>
              </li>
              {forseen && <ErrorWarning />}
            </ul>
            <div className="link_content">
              <ul className="tags_menu">
                <NavLink to="/day" style={styleNavLink}>
                  daily
                </NavLink>
                <NavLink to="/favourites" style={styleNavLink}>
                  favourites
                </NavLink>
                <NavLink to="/home" style={styleNavLink}>
                  home
                </NavLink>
                <NavLink to="/orders" style={styleNavLink}>
                  orders <SquareItems />
                </NavLink>
                <NavLink to="/events" style={styleNavLink}>
                  events
                </NavLink>
              </ul>
            </div>
          </nav>

          <main className="main_content">
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}

export default Layout;
