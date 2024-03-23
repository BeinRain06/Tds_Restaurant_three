import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import moment from "moment";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../../assets/images";

import { TemplateContext } from "../../services/context/TemplateContext";
import { MealContext } from "../../services/context/MealsContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import {
  initiateOrder,
  updateThisTotalPriceOrder,
} from "../../callAPI/OrdersApi";
import { postPayment } from "../../callAPI/PaymentApi";
import { userLogging } from "../../callAPI/UsersApi";

import CardOrder from "../cards/card-order.jsx";
import CardWeek from "../cards/card-week.jsx";
import CardWeekOrders from "../cards/card-week-orders.jsx";
import TemplateOrder from "../templateTicket/TemplateOrder.jsx";

import LogOrRegisterForm from "../cards/register-login-form.jsx";
import CardDayOrders from "../cards/card-day-orders.jsx";
import ConfirmOrder from "../process_validation/styledComponents/ConfirmOrder";
import NewLocationOrder from "../process_validation/styledComponents/NewLocationOrder";
import OneMoreStep from "../process_validation/styledComponents/OneMoreStep";
import { ButtonApplyTest } from "../process_validation/styledComponents/ButtonApply";
import ErrorWarning from "../process_validation/styledComponents/MsgError";
import getCookies from "../cookies/GetCookies";
import "./Orders.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

{
  /* <i className="fa-solid fa-plus"></i>;
<i className="fa-solid fa-minus"></i>;
<i className="fa-brands fa-cc-paypal"></i> */
}

function Orders() {
  // const dispatch = useDispatch();

  const {
    state: { meals, user, indexDayFormat, ordersWeek, ordersDay },
    handleWelcome,
    handleIndexDayShift,
  } = useContext(MealContext);

  const {
    state: {
      firstTimeOrder,
      orderSpecsCurrent,
      thisOrder,
      dataTemplatesOrdersDay,
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
    handleOrderSpecs,
    handlePayment,
    handleTemplateOrdersDay,
  } = useContext(TemplateContext);

  const {
    state: {
      applyText,
      timerIn,
      isOneMoreStep,
      openFinalValidation,
      countClickValidate,
      isError,
      indexWeekDay,
    },
    handleIndexWeekDay,
    handleCountClickValidate,
    handleIsOneMoreStep,
    handleOpenFinalValidation,
    handleIsError,
    handleForSeen,
    handleSectionName,
    handleApplyText,
    handleTimerIn,
  } = useContext(ValidationContext);

  const [showTotalPrice, setShowTotalPrice] = useState("_ _ _ _");
  const [applyColor, setApplyColor] = useState("green");
  const [myPaymentInit, setMyPaymentInit] = useState({});

  const [ourTimer, setOurTimer] = useState(() => {
    const tmpTimer = timerIn[0];
    const sentTimer = tmpTimer !== undefined ? tmpTimer : "00:00:00";
    return sentTimer;
  });

  const [myDayOrder, setMyDayOrder] = useState([]);

  const [myWeekOrder, setMyWeekOrder] = useState([]);

  const [dataTemplate, setDataTemplate] = useState(null);

  const [startingTestTimer, setStartingTestTimer] = useState("00:00:00");

  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);
  const minimizeOrApplyRef = useRef(null);
  const ticketTempRef = useRef(null);
  const ticketManualRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const interval = useRef(null);
  const applyOrderRef = useRef(null);
  const totalRef = useRef(null);
  const validateRef = useRef(null);
  const fourthMealRef = useRef(null);
  const sliderTemplateRef = useRef(null);

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

    //MiddleCore Actions
    setTimeout(async () => {
      await updateDataTemplate();
    }, 1000);

    /* handleOrdersWeek(orderSpecsCurrent); */

    callTimer(70); // time set in s  <--- // change to "7200" --> (for 2 hours) --->;

    setOurTimer("02:00:00");

    const newCount = countClickValidate + 1;
    handleCountClickValidate(newCount);

    handleOpenFinalValidation(false);

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
    handleApplyText("Apply");
    handlePayment({});
    handleOrderSpecs([]);
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

    const indexTemp = countClickValidate + 1;

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
    /* handleApplyText("Minimize"); */
    setApplyColor("gray");
    handleTicketNumber((totalPrice - 3).toString(16));
    handleHoursPrint(moment().format("hh:mm a"));
    /*  handleTimerIn("02:00:00"); */
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
        /*   const fetchingWeek = await fetchOrdersWeek(userId); */
        if (thisOrder._id !== undefined) {
          console.log("saved and updated my order (thisOrder):", thisOrder);

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

          console.log("new taken order command:", newTakenOrder);

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

  const lastingTimeError = (e) => {
    handleIsError(true);
    handleForseen(false);
    if (e.target.id === "btn_validate_order") {
      handleSectionName("validateButton");
      handleMessageError("Cannot Apply More than 3 dressing Orders!");
    } else if (e.target.id === "btn_play_game") {
      handleSectionName("fourthMealButton");
      if (orderSpecsCurrent.length >= 3) {
        handleForseen(true);
      } else {
        handleMessageError("at least you have to command 3 meals!");
      }
    }
    setTimeout(() => {
      handleIsError(true);
    }, 6000);
  };

  const lookingForGameOrValidation = (e) => {
    //indulge 3 template ticket at more
    if (e.target.id === "btn_validate_order" && countClickValidate < 2) {
      handleOpenFinalValidation(true);
    } else {
      lastingTimeError(e);
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
      const indexTimer = Object.keys(timerIn).length;

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

      setStartingTestTimer(
        (hrs > 9 ? hrs : "0" + hrs) +
          ": " +
          (min > 9 ? min : "0" + min) +
          ":" +
          (sec > 9 ? sec : "0" + sec)
      );
    }
  };

  const clearTimer = (cb) => {
    const indexTimer = Object.keys(timerIn).length;
    const newSendTimer = {
      ...timerIn,
      [indexTimer]: { value: "00:01:10" }, // change to "02:00:00" --> (for 2 hours)
    };

    handleTimerIn(newSendTimer);

    /* setOurTimer("02:00:00"); */
    setStartingTestTimer("02:00:00");

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

  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const startTestTimer = () => {
    callTimer(7200); //deadTime in s;
  };

  // if you want it to be triggered while rendering - have  a try !

  /* useEffect(() => {
    clearTimer(getDeadTime());
  }, []); */

  useEffect(() => {
    console.log("present navbar");
    console.log("present orderDay:", ordersDay);
    setTimeout(() => {
      handleWelcome(false);
    }, 3000);
  }, []);

  useEffect(() => {}, [indexWeekDay]);

  useEffect(() => {
    console.log("this place redirect to login or register form!");
  }, [firstTimeOrder]);

  useEffect(() => {
    console.log(
      "This have to Update The quantity and mini Total Price Template Ticket!"
    );

    if (Object.keys(dataTemplatesOrdersDay).length === 1) {
      setDataTemplate(dataTemplatesOrdersDay[0]);
    }
    console.log("timerIn details", timerIn);
  }, [orderSpecsCurrent, dataTemplatesOrdersDay, applyText]);

  useEffect(() => {
    console.log("Update Week and Day Show Command");
    const ArrWeek = Object.keys(ordersWeek).map((key, i) => {
      return ordersWeek[key];
    });

    const ArrDay = Object.keys(ordersDay).map((key, i) => {
      return ordersDay[key];
    });

    setMyWeekOrder(ArrWeek);
    setMyDayOrder(ArrDay);

    console.log("my week order:", ordersWeek);
    console.log("my day order:", ordersDay);
  }, [ordersDay, ordersWeek]);

  return (
    <main className="welcome_orders" onClick={(e) => console.log(e.target)}>
      <div className="gen_orders">
        <h4 className="title_order">Orders</h4>
        <button type="button" onClick={startTestTimer}>
          Surprise
        </button>
        <span>{startingTestTimer} </span>
        <hr className="breakpoint_orders"></hr>
        <div className="recap_wrapper">
          <ul className="ready_ordered snaps_inline_0">
            {orderSpecsCurrent.length !== 0 ? (
              orderSpecsCurrent.map((orderSpecItem, index) => {
                const mealItem = meals.find(
                  (item) => item._id === orderSpecItem.id
                );
                return (
                  <CardOrder
                    key={mealItem._id}
                    id={mealItem._id}
                    name={mealItem.name}
                    /* quantity={orderSpecItem.quantity} */
                    origin={mealItem.origin}
                    ratings={mealItem.ratings}
                    price={mealItem.price}
                    image={mealItem.image}
                  />
                );
              })
            ) : (
              <div className="wrapper_no_items">
                <div className="content_no">
                  <span className="no_items">No Items</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      {Object.keys(dataTemplatesOrdersDay).length === 1 && (
        <div className="template_slider_wrapper">
          {/*  <TemplateDaySent
            key="0"
            id="0"
            dataTemplate={dataTemplatesOrdersDay[0]}
            countClickValidate={countClickValidate}
            lookingForGameOrValidation={lookingForGameOrValidation}
            callTimer={callTimer}
          /> */}

          <TemplateOrder
            key="0"
            id="0"
            dataTemplate={dataTemplatesOrdersDay[0]}
            countClick={countClickValidate}
            lookingForGameOrValidation={lookingForGameOrValidation}
            callTimer={callTimer}
          />
        </div>
      )}

      {Object.keys(dataTemplatesOrdersDay).length > 1 && (
        <div className="template_slider_wrapper">
          <Slider {...settingsSlider}>
            {Object.keys(dataTemplatesOrdersDay).map((key, index) => {
              return (
                <TemplateOrder
                  key={index}
                  id={index}
                  countClick={countClickValidate}
                  lookingForGameOrValidation={lookingForGameOrValidation}
                  setApplyColor={setApplyColor}
                  bgColor={applyColor}
                />
              );
            })}
          </Slider>
        </div>
      )}
      {orderSpecsCurrent.length !== 0 &&
        Object.keys(dataTemplatesOrdersDay).length === 0 && (
          <div className="available_ticket">
            <div className="available_ticket_content" ref={ticketTempRef}>
              {/* <button className="minimize_template" onclick={openToNewLocation}>
                minimize
              </button> */}
              <h4 className="title_order">Sample</h4>
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
                    {/* change with ok button last step */}
                  </div>
                  <div className="statement_to_client">
                    <p>AS you order, your time is valued by our Team</p>
                  </div>
                </div>
                <div className="type_sample">
                  <p style={{ fontWeight: "bold" }}>Delivery Foods</p>
                  <p>Ticket N³%: {ticketNumber} </p>
                  {/* change with ok button last step */}
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
                      const mealId = order.id;
                      const meal = meals.find((item) => item._id === mealId);
                      const qty = order.quantity;
                      const minTotal = (meal.price * qty).toFixed(2);
                      return (
                        <>
                          <tbody key={i}>
                            <tr key={mealId}>
                              <td>{meal.name}</td>
                              <td>{qty}</td>
                              <td>${meal.price}</td>
                              <td>${minTotal}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
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
                      $ {showTotalPrice}
                    </span>
                    <div className="submit_container" ref={applyOrderRef}>
                      <ButtonApplyTest type="submit" bgColor={applyColor} />
                    </div>
                  </form>
                </div>

                {firstTimeOrder && (
                  <div className="appealing_registration">
                    <div className="appeal_reg_wrapper">
                      <LogOrRegisterForm
                        setShowTotalPrice={setShowTotalPrice}
                      />
                    </div>
                  </div>
                )}

                {/* start and display when you hit button validate */}
                <div className="order_track_time">
                  <div>
                    Your order will be send in less than
                    <span style={{ fontWeight: "bold" }}> 2 hours</span>
                  </div>
                  <div className="remaining_track_time">
                    <ul className="post_track_time">
                      <li>Time Remaining</li>

                      <li className="time_left"> {ourTimer} </li>
                    </ul>
                  </div>
                  {isOneMoreStep && (
                    <OneMoreStep
                      handleStepBackLoc={handleStepBackLoc}
                      handleMoveToValidation={handleMoveToValidation}
                    />
                  )}
                </div>

                <div className="address_customers">
                  <div className="address_side">
                    <p>Location10 : ${thisOrder?.street} </p>
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
        )}
      <div className="sticking_template_order">
        <div className="msg_grateful_order">
          <div>
            <p>See Your daily or weekly order underneath</p>
          </div>

          <div>
            <img src={SHAWNAN} className="grateful_img" alt="order template" />
            <p className="messaging_customers">
              Thanks You to be a part of TDs...
            </p>
          </div>
        </div>

        <div className="orders_day">
          <div className="template_day_orders">
            {
              <ul className="template_day snaps_inline">
                {JSON.stringify(ordersDay) !== "{}" ? (
                  <CardDayOrders ordersSpecs={ordersDay} />
                ) : (
                  <div className="wrapper_no_items">
                    <div className="content_no">
                      <span className="no_items">No Items</span>
                    </div>
                  </div>
                )}
              </ul>
            }
          </div>
        </div>

        <div className="template_week_orders ">
          <p className="title_week_orders">Week Orders</p>
          <div className="calendar_orders ">
            <div className="weeks_day">
              <CardWeek />
            </div>

            <div className="days_week_order">
              <ul className="days_dish_recap">
                {JSON.stringify(ordersWeek[indexWeekDay]) !== "{}" ? (
                  ordersWeek[indexWeekDay] !== undefined ? (
                    <CardWeekOrders ordersSpecs={ordersWeek[indexWeekDay]} />
                  ) : (
                    <div className="wrapper_no_items">
                      <div className="content_no">
                        <span className="no_items">No Items</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="wrapper_no_items">
                    <div className="content_no">
                      <span className="no_items">No Items</span>
                    </div>
                  </div>
                )}

                {/* <li className="day_dish_recall">
                  <div className="dish_table">
                    <div className="dish_sub_operation">
                      <div>
                        <p>
                          Notes : <span>4.6</span>
                        </p>
                      </div>
                      <div className="brief_overview_meal">
                        <img
                          src={AhmadIMG}
                          className="dish_order_img"
                          alt="oops overview"
                        />

                        <p className="dish_order_desc">Description: Italian</p>
                      </div>
                    </div>
                    <div className="dish_topic">
                      <p>Jutsu Chicken</p>
                      <p>
                        <span className="number_order">3</span>
                        <span>: Ordered</span>
                      </p>
                    </div>
                    <div className="recap_feedback">
                      <p className="send_ratings">Ratings</p>
                      <p className="send_feedback">Feedback</p>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* newest order coming */}
        <div className="new_command">
          <button type="button" className="btn_sub btn_newest_order">
            newest order
            <span className="new_command_number">
              {Array.from(dataTemplatesOrdersDay).length}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Orders;
