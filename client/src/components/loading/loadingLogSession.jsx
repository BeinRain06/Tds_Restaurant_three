import React, { useState, useEffect, useContext } from "react";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import { userLogging } from "../../callAPI/UsersApi";
import { initiateOrder } from "../../callAPI/OrdersApi";
import moment from "moment";
import "./loadingLogSession.css";

function LoadingLogSession({
  loginData,
  setIsLoggingDataSession,
  setShowTotalPrice,
}) {
  const {
    state: { user },
    handleUser,
  } = useContext(MealContext);

  const {
    state: { thisOrder, totalPrice, orderSpecsCurrent, ticketNumber },
    handleFirstTimeOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handleThisOrder,
  } = useContext(TemplateContext);

  const updateLogSession = async () => {
    const userInfo = await updateUserData();
    console.log("user here:", userInfo);
    const myOrder = await updateOrderedSpecData(userInfo);
    console.log("this order once again here:", myOrder);
    updatefieldTemplate(myOrder);
  };

  const updateUserData = async () => {
    let { email, password } = loginData;
    console.log("loginData:", loginData);

    const userInfo = await sendLoggingData({ email, password });
    return userInfo;
  };

  const updateOrderedSpecData = async (userInfo) => {
    const myOrder = await updateUserandInitOrder(userInfo);
    setTimeout(() => {
      console.log("updating ordered specs data!");
    }, 2000);
    return myOrder;
  };

  const sendLoggingData = async ({ email, password }) => {
    console.log(`that email: ${email}, that password:  ${password}`);
    const res = await userLogging({ email, password });

    return res;
  };

  const initThatOrder = async (userEmail) => {
    return await new Promise((resolve) => {
      const res = initiateOrder(userEmail, orderSpecsCurrent);
      setTimeout(() => {
        resolve(res);
      }, 2400);
    });
  };

  const updateUserandInitOrder = async (userInfo) => {
    await handleUser(userInfo);

    const userEmail = userInfo.userEmail;

    console.log("user email Log session", userEmail);

    let myOrderIn;

    myOrderIn = await initThatOrder(userEmail);

    handleThisOrder(myOrderIn);

    console.log("that result here:", myOrderIn);
    myOrderIn;
    return myOrderIn;
  };

  const updatefieldTemplate = (myOrder) => {
    setTimeout(async () => {
      console.log("this order in context:", thisOrder);

      let totalPriceIn = catchTotalPrice(myOrder);

      await handleTotalPrice(totalPriceIn);

      setShowTotalPrice(totalPriceIn);

      let currentTime = moment().format("hh:mm a");
      await handleHoursPrint(currentTime);
    }, 3500);

    setDataEndLoading(myOrder);
  };

  const setDataEndLoading = async (myOrder) => {
    return await new Promise((resolve) => {
      setIsLoggingDataSession(false);
      handleFirstTimeOrder(false);

      setTimeout(() => {
        resolve("updation ended");
      }, 2500);
    });
  };

  const catchTotalPrice = (myOrder) => {
    let total = myOrder.totalPrice.toString();
    console.log("thisorder total price here :", total);
    let totalArr = total.split(" ");
    let output = "";
    totalArr.map((elt) => {
      output += elt + " ";
    });
    return output;
  };

  useEffect(() => {
    setTimeout(async () => {
      console.log("updating Orders Specification when logging!");
      await updateLogSession();
    }, 3000);
  }, []);

  return (
    <div className="load_log_wrapper">
      <ul className="load_log_content">
        <div className="live_anim_1"></div>
        <li className="live_anim_2">
          <span className="load_log_text">Loading</span>
        </li>
      </ul>
    </div>
  );
}

export default LoadingLogSession;
