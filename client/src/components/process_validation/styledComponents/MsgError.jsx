import React, { useContext, useEffect, useState } from "react";
import { ValidationContext } from "../../../services/context/ValidationContext";

function ErrorWarning() {
  const {
    state: { messageError, componentSectionName, forseen },
    handleMessageError,
    handleForSeen,
  } = useContext(ValidationContext);

  const newMessage = forseen ? "will be implented soon, ..." : messageError;

  const applyMsgError = () => {
    handleMessageError(newMessage);
    setTimeout(() => {
      handleMessageError("");
    }, 7500);
  };

  const styleDivOne = {
    position: "absolute",
    top: "5.5rem",
    width: "90%",
    color: "brown",
    backgroundColor: "#e7e697",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const styleDivTwo = {
    position: "absolute",
    top: "5.5rem",
    width: "90%",
    color: "brown",
    backgroundColor: "#e7e697",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const styleDivThree = {
    position: "absolute",
    top: "5.5rem",
    width: "80%",
    color: "#fff",
    backgroundColor: "#693f3f",
    padding: "0.25rem 1rem",
    fontSize: "clamp(0.65rem, 0.75rem, 0.8rem)",
    border: "2px solid #fff",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 1s ease-in-out",
  };

  const chooseYourStyle = () => {
    if (
      componentSectionName === "sendNewLocOrder" ||
      componentSectionName === "paymentEnd"
    ) {
      return styleDivOne;
    } else if (
      componentSectionName === "fourthMealButton" &&
      forseen === false
    ) {
      return styleDivTwo;
    } else if (
      (componentSectionName === "fourthMealButton" ||
        componentSectionName === "searchMealsButton") &&
      forseen === true
    ) {
      return styleDivThree;
    }
  };

  useEffect(() => {
    applyMsgError();
  }, []);

  return (
    <>
      {messageError !== "" && (
        <div style={chooseYourStyle()}>
          <p>{messageError}</p>
        </div>
      )}
    </>
  );
}

export default ErrorWarning;
