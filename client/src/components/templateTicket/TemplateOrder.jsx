import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import moment from "moment";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import PaymentSubmit from "../process_validation/PaymentSubmit";
import { postPayment } from "../../callAPI/PaymentApi";

import {
  initiateOrder,
  updateThisTotalPriceOrder,
} from "../../callAPI/OrdersApi";
import getCookies from "../cookies/GetCookies";

import ConfirmOrder from "../process_validation/styledComponents/ConfirmOrder";
import NewLocationOrder from "../process_validation/styledComponents/NewLocationOrder";
import OneMoreStep from "../process_validation/styledComponents/OneMoreStep";
import ButtonApply from "../process_validation/styledComponents/ButtonApply";
import { ButtonApplyTest } from "../process_validation/styledComponents/ButtonApply";
import ErrorWarning from "../process_validation/styledComponents/MsgError";
import "./TemplateOrder.css";

export const TemplateDayFlying = ({
  id,
  setIsEnd,
  lookingForGameOrValidation,
}) => {
  const {
    state: { user },
  } = useContext(MealContext);
  const {
    state: {
      firstTimeOrder,
      orderSpecsCurrent,
      thisOrder,
      dataTemplatesOrdersDay,
      timer,
      isNewLocation,
      payments,
      ticketNumber,
      totalPrice,
      hoursPrinted,
    },
    handleNewLocation,
    handleFirstTimeOrder,
    handleThisOrder,
    handleTotalPrice,
    handleTicketNumber,
    handleHoursPrint,
    handleTimer,
    handleTemplateOrdersDay,
  } = useContext(TemplateContext);

  const ticketTempRef = useRef(null);
  const ticketManualRef = useRef(null);
  const totalRef = useRef(null);
  const applyOrderRef = useRef(null);
  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const oneMoreStepRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);
  const validateRef = useRef(null);
  const fourthMealRef = useRef(null);

  const [showTotalPrice, setShowTotalPrice] = useState("_ _ _ _");

  //process validation Hook
  const {
    state: {
      openFinalValidation,
      isOneMoreStep,
      applyText,
      countClickValidate,
      forseen,
      componentSectionName,
      messageError,
      timerIn,
      isError,
    },
    handleOpenFinalValidation,
    handleIsOneMoreStep,
    handleApplyText,
    handleCountClickValidate,
    handleForSeen,
    handleSectionName,
    handleMessageError,
    handleTimerIn,
  } = useContext(ValidationContext);

  const { handlePayment, handleOrderSpecs } = useContext(TemplateContext);

  /* handleOrders, handlePayment, handleOrderSpecs */

  //recording template data order
  const [isPayment, setIsPayment] = useState({});
  const [ourTimer, setOurTimer] = useState("00:00:00");
  const [applyColor, setApplyColor] = useState("green");

  const interval = useRef(null);

  /* li, handleMoveToValidation  */

  const firstStepPayment = async () => {
    return await new Promise(async (resolve) => {
      console.log("inside this order:", thisOrder);
      const newPayment = await postPayment(
        thisOrder._id,
        "MTN",
        thisOrder.codePayment,
        thisOrder.totalPrice
      );

      setTimeout(() => {
        resolve(newPayment);
      }, 3000);
    });
  };

  // HERE ===>  NEXT FUNCTION TO IMPLEMENT ACTION   <=== HERE
  const validateThisOrder = () => {
    //Pre-Actions
    validateRef.current.classList.remove("impact_more_step");
    handleApplyText("Minimize");
    setApplyColor("gray");

    //MiddleCore Actions
    setTimeout(async () => {
      await updateDataTemplate();
    }, 4000);

    /* handleOrdersWeek(orderSpecsCurrent); */

    callTimer(70); // time set in s  <--- // change to "7200" --> (for 2 hours) --->;

    setOurTimer("02:00:00");

    const newCount = countClickValidate + 1;
    handleCountClickValidate(newCount);

    handleOpenFinalValidation(false);

    setIsEnd(true);

    //reset variable involved in template_order
    resetDataHoldingTemplate();
    setTimeout(() => {
      setOurTimer("00:00:00");
    }, 4000);
  };

  const resetDataHoldingTemplate = () => {
    handleTicketNumber("_ _ _ _ _ _");
    handleHoursPrint("time");
    handleTotalPrice("_ _ _ _");
    handleThisOrder({});
    handlePayment({});
    handleApplyText("Apply");
    handleOrderSpecs([]);
    handleTimer("00:00:00");
  };

  const updateDataTemplate = async () => {
    let initPayment;
    let newDataTemplateOrdersDay;
    initPayment = await firstStepPayment();

    console.log("initPayment:", initPayment);
    setMyPaymentInit(initPayment);

    const indexPayment = countClickValidate + 1;

    let newPayment = { ...payments, [indexPayment]: initPayment };
    handlePayment(newPayment);

    //recording template data order
    let dataRecordObj = {
      ticketNumber: ticketNumber,
      thisOrder: thisOrder,
      hoursPrinted: hoursPrinted,
      totalPrice: totalPrice,
      payments: newPayment,
      timer: "02:00:00",
      orderSpecsCurrent: orderSpecsCurrent,
    };

    console.log("dataRecordObj:", dataRecordObj);

    const indexTemp = Object.keys(dataTemplatesOrdersDay).length;

    newDataTemplateOrdersDay = {
      ...dataTemplatesOrdersDay,
      [indexTemp]: dataRecordObj,
    };

    handleTemplateOrdersDay(newDataTemplateOrdersDay);
  };

  const handleStepBackLoc = (space) => {
    if (space === "toLocation") {
      handleNewLocation(true);
      setOurTimer("00:00:00");
    } else if (space === "toTemplate") {
      handleNewLocation(false);
      handleApplyText("Apply");
      handleOpenFinalValidation(false);
    }
    handleIsOneMoreStep(false);
    validateRef.current.classList.remove("impact_more_step");
  };

  const handleMoveToValidation = () => {
    handleIsOneMoreStep(false);
    /*  handleOpenFinalValidation(true); */
    /* handleApplyText("Minimize"); */
    setApplyColor("gray");
    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    setOurTimer("02:00:00");
    validateRef.current.classList.add("impact_more_step");
  };

  const handleControlRadio = async (e) => {
    console.log(e.target);

    if (e.target.id === "reg_price_2") {
      const cookies = getCookies();
      const userId = cookies.userId;
      console.log("cookies userId:", userId);

      if (userId === undefined) {
        setTimeout(() => {
          handleFirstTimeOrder(true);
        }, 1000);
        totalRef.current.classList.add("anim_height");
        setTimeout(async () => {
          await applyOrderRef.current.classList.add("addShowBtn");
        }, 2000);
        return;
      } else {
        handleFirstTimeOrder(false);

        /* const fetchingWeek = await fetchOrdersWeek(userId); */

        if (thisOrder._id !== undefined) {
          console.log(
            "saved and updated my order errLoc(thisOrder):",
            thisOrder
          );

          const newChange = await updateThisTotalPriceOrder(
            thisOrder._id,
            orderSpecsCurrent
          );

          handleThisOrder(newChange);

          setTimeout(() => {
            console.log("new this order send back:", newChange);
          }, 1000);

          setShowTotalPrice(newChange.totalPrice);
          handleTotalPrice(newChange.totalPrice);
        } else if (thisOrder._id === undefined) {
          console.log("user data saved:", user);
          const newTakenOrder = await initiateOrder(
            user.userEmail,
            orderSpecsCurrent
          );

          handleThisOrder(newTakenOrder);

          setShowTotalPrice(newTakenOrder.totalPrice);

          setTimeout(() => {
            console.log("new taken order command:", newTakenOrder);
          }, 1000);
          handleTotalPrice(newTakenOrder.totalPrice);
        }
      }

      applyOrderRef.current.classList.add("addShowBtn");
      totalRef.current.classList.add("anim_height");
    } else if (e.target.id === "reg_price_1") {
      setShowTotalPrice("_" + " " + "_" + " " + "_" + " " + "_");
      setTimeout(() => {
        console.log("update showTotalPrice");
      }, 2500);

      applyOrderRef.current.classList.remove("addShowBtn");
      totalRef.current.classList.add("anim_height");
    }
  };

  const openToNewLocation = () => {
    if (applyText === "Apply") {
      handleNewLocation(true);
    } else if (applyText === "Minimize") {
      ticketTempRef.current.style.classList.add("anim_hide_template");
      // add anim show bookOrder
      ticketManualRef.current.style.classList.add("anim_show_book");
    }
  };

  const getRemainingTime = (cb) => {
    const diff = Date.parse(cb) - Date.parse(new Date());

    //get Hrs --> Integer Division of diff by [1hr] in ms
    const hrs = Math.floor(diff / (1 * 60 * 60 * 1000));

    //get Mins --> Integer Division of the [remainder]-hour Division  by [1min] in ms
    const min = Math.floor((diff % (1 * 60 * 60 * 1000)) / (1 * 60 * 1000));

    //get Secs --> Integer Division of the [remainder]-minute Division  by [1sec] in ms
    const sec = Math.floor((diff % (1 * 60 * 1000)) / (1 * 1000));

    return { diff, hrs, min, sec };
  };

  const startTimer = (cb) => {
    let { diff, hrs, min, sec } = getRemainingTime(cb);

    if (diff >= 0) {
      /*  const indexTimer = Object.keys(timerIn).length; */

      const indexTimer = countClickValidate + 1;

      const newSendTimer = {
        ...timerIn,
        [indexTimer]: {
          value:
            (hrs > 9 ? hrs : "0" + hrs) +
            ": " +
            (min > 9 ? min : "0" + min) +
            ":" +
            (sec > 9 ? sec : "0" + sec),
        },
      };

      handleTimerIn(newSendTimer);

      /*  setOurTimer(
          (hrs > 9 ? hrs : "0" + hrs) +
            ": " +
            (min > 9 ? min : "0" + min) +
            ":" +
            (sec > 9 ? sec : "0" + sec)
        ); */
    }
  };

  const clearTimer = (cb) => {
    /* const indexTimer = Object.keys(timerIn).length; */

    const indexTimer = countClickValidate + 1;

    const newSendTimer = {
      ...timerIn,
      [indexTimer]: { value: "00:01:10" }, // change to "02:00:00" --> (for 2 hours)
    };
    handleTimerIn(newSendTimer);

    /* setOurTimer("02:00;00"); */

    //avoid mutiple setInterval() to run for the same - scope : *interval* (reinitialize Timer or reset Timer !)
    if (interval.current) clearInterval(interval.current);

    const id = setInterval(() => {
      startTimer(cb);
    }, 1000);

    interval.current = id;
  };

  const getDeadTime = (deadTime) => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + deadTime);
    return deadline;
  };

  const callTimer = (deadTime) => {
    clearTimer(getDeadTime(deadTime));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log(e.target);
    openToNewLocation();
  };

  useEffect(() => {
    console.log("TemplateDayFlying:", dataTemplatesOrdersDay);
  }, []);

  useEffect(() => {
    console.log("this place redirect to login or register form!");
  }, [firstTimeOrder]);

  useEffect(() => {
    console.log(
      "This have to Update The quantity and mini Total Price Template Ticket!"
    );
  }, [orderSpecsCurrent, dataTemplatesOrdersDay, applyText]);

  /*  <div key={id} className="template_slider_boundary">
     
    </div> */

  useEffect(() => {
    console.log("Grab OrderSpecCurrent useEff:", orderSpecsCurrent);
    console.log("Grab dataTemplatesOrdersDay useEff:", dataTemplatesOrdersDay);
  }, []);

  return (
    <>
      <div key={id} className="template_slider_boundary">
        <div className="template_slider_content">
          <div className="available_ticket">
            <div className="available_ticket_content" ref={ticketTempRef}>
              <h4 className="title_order">Sample {id} </h4>
              <hr className="breakpoint_ticket"></hr>
              <div className="sample_ticket">
                <div className="header_sample">
                  <div className="sample_logo">
                    <div className="logo_brand">
                      <span>T</span>
                      <span>D</span>
                      <span>S</span>
                    </div>
                  </div>
                  <div className="current_day_time">
                    <h4>{hoursPrinted}</h4>
                  </div>
                  <div className="statement_to_client">
                    <p>AS you order, your time is valued by our Team</p>
                  </div>
                </div>
                <div className="type_sample">
                  <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
                  <p>Ticket N³%: ${ticketNumber} </p>
                </div>
                <div className="spec_details_orders">
                  <table>
                    <thead>
                      <tr>
                        <th>meals</th>
                        <th>qty</th>
                        <th>price</th>
                        <th>ToTal</th>
                      </tr>
                    </thead>

                    {orderSpecsCurrent.map((order, i) => {
                      const meal = order.name;
                      const qty = order.quantity;
                      const minTotal = (order.price * qty).toFixed(2);
                      return (
                        <tbody>
                          <tr>
                            <td>{meal}</td>
                            <td>{qty}</td>
                            <td>${order.price}</td>
                            <td>${minTotal}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
                <div className="table_recap">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>${showTotalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="totalPrice_in">
                  <form
                    className="control_radio"
                    onSubmit={(e) => handleSubmitOrder(e)}
                  >
                    <ul
                      className="input_radio_price"
                      onChange={(e) => handleControlRadio(e)}
                    >
                      <li>
                        <input
                          type="radio"
                          name="radio_price"
                          id="reg_price_1"
                          className="reg_price_1 reg_price"
                        />
                        <label htmlFor="none">keep ordering</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="radio_price"
                          id="reg_price_2"
                          className="reg_price_2 reg_price"
                        />
                        <label htmlFor="totalPrice">total Price</label>
                      </li>
                    </ul>
                    <span className="total_bill" ref={totalRef}>
                      ${showTotalPrice}
                    </span>
                    <div className="submit_container" ref={applyOrderRef}>
                      <ButtonApplyTest type="submit" bgColor={applyColor} />
                    </div>
                  </form>
                </div>

                {firstTimeOrder && (
                  <div className="appealing_registration">
                    {/* //write css */}
                    <LogOrRegisterForm setShowTotalPrice={setShowTotalPrice} />
                  </div>
                )}

                <br></br>

                {/* start and display when you hit button validate */}
                <div className="order_track_time">
                  <div>
                    Your order will be send in less than
                    <span style={{ fontWeight: "bold" }}> 2 hours</span>
                  </div>
                  <div className="remaining_track_time">
                    <ul className="post_track_time">
                      <li>Time Remaining</li>

                      <li className="time_left">{ourTimer}</li>
                    </ul>
                    {isOneMoreStep && (
                      <OneMoreStep
                        handleStepBackLoc={handleStepBackLoc}
                        handleMoveToValidation={handleMoveToValidation}
                      />
                    )}
                  </div>
                </div>

                <div className="address_customers">
                  <div className="address_side">
                    <p>Location21 : ${thisOrder.street}</p>
                    <p className="grateful_words">
                      Thanks you Trusting TDs Services
                    </p>
                  </div>

                  <div className="submit_ticket">
                    <button
                      type="button"
                      id="btn_validate_order"
                      className="btn_validate_order"
                      ref={validateRef}
                      onClick={(e) => lookingForGameOrValidation(e)}
                    >
                      validate
                    </button>
                    <button
                      type="button"
                      id="btn_play_game"
                      className="btn_play_game"
                      ref={fourthMealRef}
                      onClick={(e) => lookingForGameOrValidation(e)}
                    >
                      Fourth Meal Game
                    </button>

                    {isError && <ErrorWarning />}

                    {openFinalValidation && (
                      <ConfirmOrder
                        handleStepBackLoc={handleStepBackLoc}
                        validateThisOrder={validateThisOrder}
                      />
                    )}
                  </div>

                  <div className="noti_payment">
                    <p className="notification">
                      You will be shortly send a code to complete the
                      transaction
                    </p>

                    <div className="payment_wrapper">
                      <button type="button" className="btn_sub btn_payment">
                        Payment
                      </button>
                    </div>
                  </div>
                  {isNewLocation && <NewLocationOrder />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateDaySent = ({ id }) => {
  const { handleOrdersWeek, handleOrdersDay } = useContext(MealContext);

  const {
    state: { timerIn, isEndWatchingTimer },
    handleIsEndWatchingTimer,
    handleTimerIn,
  } = useContext(ValidationContext);

  const {
    state: { dataTemplatesOrdersDay },
  } = useContext(TemplateContext);

  /* const [isEndWatchingTimer, handleIsEndWatchingTimer] = useState(false); */

  const [isPayment, setIsPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const ticketManualRef = useRef(null);

  const breakEndRef = useRef(null);
  const payBtnRef = useRef(null);

  const hideOrShowBookManual = (currentPlay) => {
    if (currentPlay === "show") {
      // show anim show bookOrder
      ticketManualRef?.current.classList.add("anim_show_book");

      ticketManualRef?.current.previousElementSibling.classList.remove(
        "showing_up"
      );

      ticketManualRef?.current.parentElement.classList.remove("flex_move");

      breakEndRef?.current.classList.add("expand_book");
    } else if (currentPlay === "hide") {
      // hide anim show bookOrder
      ticketManualRef?.current.classList.remove("anim_show_book");

      ticketManualRef?.current.previousElementSibling.classList.add(
        "showing_up"
      );

      ticketManualRef?.current.parentElement.classList.add("flex_move");

      breakEndRef?.current.classList.remove("expand_book");
    }

    console.log("ticketManualRef:", ticketManualRef);
  };

  const delayPayment = () => {
    console.log("abort payment");
    setIsPayment(false);
    payBtnRef.current.classList.remove("shadow_btn");
  };

  const handleIsEndPayment = (e) => {
    e.preventDefault();
    setIsPayment(true);
    payBtnRef.current.classList.add("shadow_btn");
  };

  useEffect(() => {
    console.log("isPaid : ==", isPaid);
    console.log("dataTemplatesOrdersDay[+id]:", dataTemplatesOrdersDay[+id]);
    console.log("timerIn[id] --3:", timerIn);
  }, []);

  useEffect(() => {
    console.log("timerIn -- 2:", timerIn);
    console.log("timerIn[id] -- 2:", timerIn[id]);

    const countingTimer = () => {
      const tmpArr = timerIn[id].value.split(":");

      const countDown = tmpArr.reduce((acc, val) => {
        const newVal = parseInt(val);
        return acc + newVal;
      }, 0);

      if (countDown === 0) {
        handleIsEndWatchingTimer(true);
      }
    };
    const timerEndAndAction = () => {
      const newTimerIn = { ...timerIn, [id]: { value: "00:00:00" } };
      handleTimerIn(newTimerIn);

      handleIsEndWatchingTimer(false);
      return;
    };

    if (timerIn !== true) {
      countingTimer();
    } else {
      timerEndAndAction();
    }
  }, [timerIn]);

  return (
    <>
      <div key={id} className="template_slider_boundary">
        <div key={id} className="template_slider_content">
          <div className="available_ticket_sliding">
            <div className="available_ticket_end">
              <h4 className="title_order_sample">Sample {id} </h4>
              <div
                className="ticket_book_left anim_show_book"
                ref={ticketManualRef}
              >
                <h4 className="title_order_mod">Sample {id} </h4>
                <div className="available_book_content">
                  <div className="available_book_order">
                    <div className="entitled">
                      <span className="title_order">1 Book Order</span>
                    </div>
                    <div className="logo_restaurant">
                      <span className="label_restaurant">TDS</span>
                    </div>
                    <button
                      className="view_template"
                      onClick={(ongoing) =>
                        hideOrShowBookManual((ongoing = "hide"))
                      }
                    >
                      full template
                    </button>
                  </div>
                </div>
              </div>
              <hr
                className="breakpoint_ticket_end expand_book "
                ref={breakEndRef}
              ></hr>
              <div className="sample_ticket">
                <div className="header_sample">
                  <div className="sample_logo">
                    <div className="logo_brand">
                      <span>T</span>
                      <span>D</span>
                      <span>S</span>
                    </div>
                  </div>
                  <div className="current_day_time">
                    <h4>{dataTemplatesOrdersDay[+id].hoursPrinted}</h4>
                  </div>
                  <div className="statement_to_client">
                    <p>AS you order, your time is valued by our Team</p>
                  </div>
                </div>
                <div className="type_sample">
                  <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
                  <p>Ticket N³%: {dataTemplatesOrdersDay[+id].ticketNumber} </p>
                </div>
                <div className="spec_details_orders">
                  <table>
                    <thead>
                      <tr>
                        <th>meals</th>
                        <th>qty</th>
                        <th>price</th>
                        <th>ToTal</th>
                      </tr>
                    </thead>

                    {dataTemplatesOrdersDay[+id].orderSpecsCurrent.map(
                      (order, i) => {
                        const meal = order.name;
                        const qty = order.quantity;
                        const minTotal = (order.price * qty).toFixed(2);
                        return (
                          <tbody key={i}>
                            <tr>
                              <td>{meal}</td>
                              <td>{qty}</td>
                              <td>${order.price}</td>
                              <td>${minTotal}</td>
                            </tr>
                          </tbody>
                        );
                      }
                    )}
                  </table>
                </div>
                <div className="table_recap">
                  <table>
                    <tbody id="body_bill">
                      <tr>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>
                          <i className="fa-solid fa-minus"></i>
                        </td>
                        <td>${dataTemplatesOrdersDay[+id].totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="totalPrice_in">
                  <div className="control_radio">
                    <ul className="input_radio_price">
                      <li>
                        <input
                          type="radio"
                          name="radio_price"
                          id="reg_price_1"
                          className="reg_price_1 reg_price"
                          disabled
                        />
                        <label htmlFor="none">keep ordering</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="radio_price"
                          id="reg_price_2"
                          className="reg_price_2 reg_price"
                          checked
                          disabled
                        />
                        <label htmlFor="totalPrice">total Price</label>
                      </li>
                    </ul>
                    <span className="total_bill anim_height ">
                      ${dataTemplatesOrdersDay[+id].totalPrice}
                    </span>
                    <div className="submit_container addShowBtn">
                      <ButtonApply
                        type="submit"
                        id={id}
                        onClick={(ongoing) =>
                          hideOrShowBookManual((ongoing = "show"))
                        }
                      />
                    </div>
                  </div>
                </div>

                <br></br>
                {/* start and display when you hit button validate */}
                {isPaid ? (
                  <div></div>
                ) : (
                  <div className="order_track_time">
                    <div>
                      Your order will be send in less than
                      <span style={{ fontWeight: "bold" }}> 2 hours</span>
                    </div>
                    <div className="remaining_track_time">
                      <ul className="post_track_time">
                        <li>Time Remaining</li>
                        {timerIn !== true && (
                          <li className="time_left">{timerIn[id]?.value}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="address_customers">
                  <div className="address_side">
                    <p>
                      Location22 : $
                      {dataTemplatesOrdersDay[+id].thisOrder.street}
                    </p>
                    <p className="grateful_words">
                      Thanks you Trusting TDs Services
                    </p>
                    {isEndWatchingTimer && (
                      <div className="code_payment_wrapper">
                        <p>A Deliverer will be reaching you soon. Get Ready</p>
                        <h4>Your Code Payment</h4>
                        <p className="code_payment_contract">
                          {dataTemplatesOrdersDay[+id].thisOrder.codePayment}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="noti_payment">
                    <p className="notification">
                      You will be shortly send a code to complete the
                      transaction
                    </p>

                    <div className="payment_wrapper">
                      {!isPaid ? (
                        <button
                          type="button"
                          className="btn_sub btn_payment"
                          onClick={handleIsEndPayment}
                          ref={payBtnRef}
                        >
                          Payment
                        </button>
                      ) : (
                        <button type="button" className="btn_sub btn_paid">
                          Paid
                          <span
                            style={{
                              margin: "0 0.5rem",
                              fontSize: "clamp(0.75rem, 0.85rem, 1rem)",

                              borderColor: "#fff",
                            }}
                          >
                            &#9734;
                          </span>
                        </button>
                      )}

                      {isPayment && (
                        <PaymentSubmit
                          id={id}
                          delayPayment={delayPayment}
                          setIsPayment={setIsPayment}
                          setIsPaid={setIsPaid}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function TemplateOrder({ id, countClick, lookingForGameOrValidation }) {
  /*  const [isEnd, setIsEnd] = useState(getStatusEnd(id, countClickValidate)); */
  const {
    state: { countClickValidate },
  } = useContext(ValidationContext);

  const [idToTake, setIdToTake] = useState(id);

  const [isEnd, setIsEnd] = useState(() => {
    const status = idToTake <= countClick ? true : false;
    return status; // watch countClick
  });

  useEffect(() => {
    console.log("count click validate useEff:", countClickValidate);
  }, []);

  /* useEffect(() => {
    if (countClickValidate >= 1) {
      setIdToTake(countClickValidate.toString());
      setTimeout(() => {
        setIsEnd(true);
      }, 3000);
    }
  }, [countClickValidate]); */

  /* 
  {
    isEnd ? (
      <TemplateDaySent
        id={id}
        dataTemplate={dataTemplate}
        countClickValidate={countClickValidate}
      />
    ) : (
      <TemplateDayFlying
        id={id}
        lookingForGameOrValidation={lookingForGameOrValidation}
      />
    );
  } */

  if (isEnd) {
    return (
      <TemplateDaySent
        id={idToTake}
        /* countClickValidate={countClickValidate} */
      />
    );
  } else {
    return (
      <TemplateDayFlying
        id={idToTake}
        setIsEnd={setIsEnd}
        lookingForGameOrValidation={lookingForGameOrValidation}
      />
    );
  }
}

export default TemplateOrder;
