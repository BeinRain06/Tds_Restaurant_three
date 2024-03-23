import React, {
  useReducer,
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";

export const INITIAL_STATE_ONE = {
  isNewLocation: false,
  dataNewLocation: {},
  firstTimeOrder: false,
  thisOrder: {},
  ticketNumber: "_ _ _ _ _ _",
  hoursPrinted: "time",
  totalPrice: "_ _ _ _",
  timer: "00:00:00",
  payments: {}, //  obj of Arr 3 max
  orderSpecsCurrent: [],
  countDownTimerArr: [], //arr of string
  dataTemplatesOrdersDay: {}, //  obj of Arr 3 max
};

export const ACTIONS_TYPES = {
  OPEN_NEW_LOCATION: "OPEN_NEW_LOCATION",
  DATA_NEW_LOCATION: "DATA_NEW_LOCATION",
  ORDER_SPECS: "ORDER_SPECS",
  FIRST_TIME_ORDER: "FIRST_TIME_ORDER",
  THIS_ORDER: "THIS_ORDER",
  TICKET_NUMBER: "TICKET_NUMBER",
  HOURS_PRINT: "HOURS_PRINT",
  TOTAL_PRICE: "TOTAL_PRICE",
  TIMER: "TIMER",
  PAYMENT: "PAYMENT",
  COUNT_DOWN_TIMER: "COUNT_DOWN_TIMER",
  TEMPLATE_ORDERS_DAY: "TEMPLATE_ORDERS_DAY",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.OPEN_NEW_LOCATION:
      return { ...state, isNewLocation: action.payload };

    case ACTIONS_TYPES.DATA_NEW_LOCATION:
      return { ...state, dataNewLocation: action.payload };

    case ACTIONS_TYPES.ORDER_SPECS:
      return { ...state, orderSpecsCurrent: action.payload };

    case ACTIONS_TYPES.FIRST_TIME_ORDER:
      return { ...state, firstTimeOrder: action.payload };

    case ACTIONS_TYPES.THIS_ORDER:
      return { ...state, thisOrder: action.payload };

    case ACTIONS_TYPES.TICKET_NUMBER:
      return { ...state, ticketNumber: action.payload };

    case ACTIONS_TYPES.HOURS_PRINT:
      return { ...state, hoursPrinted: action.payload };

    case ACTIONS_TYPES.TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };

    case ACTIONS_TYPES.TIMER:
      return { ...state, timer: action.payload };

    case ACTIONS_TYPES.PAYMENT:
      return { ...state, payments: action.payload };

    case ACTIONS_TYPES.COUNT_DOWN_TIMER:
      return { ...state, countDownTimerArr: action.payload };

    case ACTIONS_TYPES.TEMPLATE_ORDERS_DAY:
      return { ...state, dataTemplatesOrdersDay: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsTemplateContext = (INITIAL_STATE_ONE) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_ONE);

  const handleIncrease = useCallback(async (mealId, mySpecsOrder) => {
    return await new Promise((resolve) => {
      mySpecsOrder.forEach((item) => {
        if (item.id === mealId) {
          item.quantity += 1;
        }
      });

      dispatch({
        type: ACTIONS_TYPES.ORDER_SPECS,
        payload: mySpecsOrder,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleDecrease = useCallback(async (mealId, mySpecsOrder) => {
    return await new Promise((resolve) => {
      /* const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
        if (item.meal === mealId) {
          item.quantity -= 1;
        }
      });

      dispatch({ type: ACTIONS_TYPES.ORDER_SPECS, payload: newOrderSpecs }); */

      const mealItem = mySpecsOrder.find((item) => item.id === mealId);
      const mealItemIndex = mySpecsOrder.findIndex(
        (item) => item.id === mealId
      );

      if (mealItem.quantity === 1) {
        mySpecsOrder.splice(mealItemIndex, 1);
      } else {
        mySpecsOrder.forEach((item) => {
          if (item.id === mealId) {
            item.quantity -= 1;
          }
        });
      }

      dispatch({
        type: ACTIONS_TYPES.ORDER_SPECS,
        payload: mySpecsOrder,
      });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleClear = useCallback(async (mealId, mySpecsOrder) => {
    return await new Promise((resolve) => {
      /*  const newOrderSpecs = state.orderSpecsCurrent.map((item) => {
        if (item.meal === mealId) {
          item.quantity = 0;
        }
      });

      dispatch({ type: ACTIONS_TYPES.ORDER_ITEM, payload: newOrderSpecs }); */

      const mealItemIndex = mySpecsOrder.findIndex(
        (item) => item.id === mealId
      );
      mySpecsOrder.splice(mealItemIndex, 1);

      dispatch({
        type: ACTIONS_TYPES.ORDER_SPECS,
        payload: mySpecsOrder,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleNewLocation = useCallback(async (isOpen) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.OPEN_NEW_LOCATION,
        payload: isOpen,
      });
      setTimeout(resolve, 2000);
    });
  }, []);

  const handleFirstTimeOrder = useCallback(async (nextState) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.FIRST_TIME_ORDER,
        payload: nextState,
      });
      setTimeout(resolve, 2000);
    });
  }, []);

  const handleThisOrder = useCallback(async (newOrder) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.THIS_ORDER, payload: newOrder });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleTicketNumber = useCallback(async (newOrder) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.TICKET_NUMBER, payload: newOrder });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleHoursPrint = useCallback(async (newHours) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.HOURS_PRINT, payload: newHours });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleTotalPrice = useCallback(async (totalPrice) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.TOTAL_PRICE, payload: totalPrice });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handlePayment = useCallback(async (newPayment) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.PAYMENT, payload: newPayment });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleTimer = useCallback(async (newTimer) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.TIMER, payload: newTimer });
      setTimeout(resolve, 3000);
    });
  }, []);

  /* const handleTemplateOrdersDay = useCallback(async (newTemplate) => {
    return await new Promise((resolve) => {
      const oldArrTemplate = state.dataTemplatesOrdersDay;
      const nextIndex = oldArrTemplate.length;
      let newArrTemplateOrders;
      newArrTemplateOrders = [
        ...oldArrTemplate,
        (oldArrTemplate[nextIndex] = newTemplate),
      ];
      dispatch({
        type: ACTIONS_TYPES.TEMPLATE_ORDERS_DAY,
        payload: newArrTemplateOrders,
      });

      setTimeout(resolve, 3000);
    });
  }, []); */

  const handleTemplateOrdersDay = useCallback(async (newTemplate) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.TEMPLATE_ORDERS_DAY,
        payload: newTemplate,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const wholeCountDownTimersDay = useCallback(async (newTimer) => {
    return await new Promise((resolve) => {
      const oldArrTimers = state.countDownTimerArr;
      const nextIndex = oldArrTimers.length;
      let newArrTimers;
      newArrTimers = [...oldArrTimers, (oldArrTimers[nextIndex] = newTimer)];

      dispatch({
        type: ACTIONS_TYPES.COUNT_DOWN_TIMER,
        payload: newArrTimers,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleUpstreamOrder = useCallback(async (e) => {
    return await new Promise((resolve) => {
      console.log(e.target);
      const mealID = e.target.parentElement.getAttribute("data-mealid");
      const mealName = e.target.parentElement.getAttribute("data-mealname");
      const mealPrice = e.target.parentElement.getAttribute("data-price");

      let orderItems = [];
      let indexItem = null;
      let qty = 0;

      let orderSpecsCurrent = state.orderSpecsCurrent;
      if (orderSpecsCurrent.length === 0) {
        qty += 1;
        orderItems.push({
          meal: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
        });

        console.log("orderItems:", orderItems);
      } else {
        indexItem = orderSpecsCurrent.findIndex((item) => item.meal === mealID);
        if (indexItem) {
          let orderItem = orderSpecsCurrent[indexItem];
          orderItems = [
            ...orderSpecsCurrent,
            (orderSpecsCurrent[indexItem] = {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            }),
          ];

          console.log("orderItems:", orderItems);
        } else {
          qty += 1;
          orderItems.push({
            meal: mealID,
            name: mealName,
            quantity: qty,
            price: mealPrice,
          });
          console.log("orderItems:", orderItems);
        }
      }

      dispatch({
        type: ACTIONS_TYPES.ORDER_SPECS,
        payload: orderItems,
      });

      setTimeout(resolve, 2500);
    });
  }, []);

  const handleOrderSpecs = useCallback(async (orderInSpecs) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.ORDER_SPECS,
        payload: orderInSpecs,
      });
      setTimeout(resolve, 3000);
    });
  }, []);

  const useAsyncGenerator = (generatorFn) => {
    const [state, setState] = useState({ loading: true, refetch: () => {} });

    useEffect(() => {
      //(iterator Fn <-- commit to *gnrtor*)
      async function executeTemplate(gnrtor) {
        try {
          const { value, done } = await gnrtor.next(); //  push gnrtor to the next value
          if (!done) {
            //setState and either continue or not (if ... else)
            setState((prevState) => ({
              ...prevState,
              loading: false,
              data: value,
            }));
            executeTemplate(gnrtor);
          } else {
            setState((prevState) => ({
              ...prevState,
              loading: false,
              data: value,
            }));
          }
        } catch (err) {
          console.log(err);
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error,
          }));
        }
      }

      const refetch = () => {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));
        executeTemplate(generatorFn());
      };

      executeTemplate(generatorFn());

      setState((prevState) => ({
        ...prevState,
        refetch,
      }));

      return state;
    }, []);

    return state;
  };

  return {
    state,
    handleDecrease,
    handleIncrease,
    handleClear,
    handleNewLocation,
    handleFirstTimeOrder,
    handleThisOrder,
    handleTicketNumber,
    handleHoursPrint,
    handleTotalPrice,
    handlePayment,
    handleTimer,
    handleTemplateOrdersDay,
    handleUpstreamOrder,
    handleOrderSpecs,
    wholeCountDownTimersDay,
    useAsyncGenerator,
  };
};

const initStateContext = {
  state: INITIAL_STATE_ONE,
  handleDecrease: () => {},
  handleIncrease: () => {},
  handleClear: () => {},
  handleNewLocation: () => {},
  handleFirstTimeOrder: () => {},
  handleThisOrder: () => {},
  TemplateContext: () => {},
  handleTicketNumber: () => {},
  handleHoursPrint: () => {},
  handleTotalPrice: () => {},
  handlePayment: () => {},
  handleTimer: () => {},
  handleTemplateOrdersDay: () => {},
  handleUpstreamOrder: () => {},
  handleOrderSpecs: () => {},
  wholeCountDownTimersDay: () => {},
  useAsyncGenerator: () => {},
};

export const TemplateContext = createContext(initStateContext);

function TemplateContextProvider({ children, ...INITIAL_STATE_ONE }) {
  return (
    <TemplateContext.Provider
      value={functionsTemplateContext(INITIAL_STATE_ONE)}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export default TemplateContextProvider;
