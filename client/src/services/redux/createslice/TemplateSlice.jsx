import React, { useEffect, useState } from "react";
import { createSlice, createSelector } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "orderPrime",
  initialState: {
    isNewLocation: false,
    dataNewLocation: {},
    firstTimeOrder: false,
    thisOrder: {},
    ticketNumber: "_ _ _ _ _ _",
    hoursPrinted: "time",
    totalPrice: "_ _ _ _",
    timer: "00:00:00",
    payment: [],
    orderSpecsCurrent: [],
    countDownTimerArr: [], //arr of string
    dataTemplatesOrdersDay: [], // arr of obj
  },
  reducers: {
    handleNewLocation: (state, action) => {
      state.isNewLocation = action.payload;
    },
    handleFirstTimeOrder: (state, action) => {
      state.firstTimeOrder = action.payload;
    },
    handleThisOrder: (state, action) => {
      state.thisOrder = action.payload;
    },
    handleTicketNumber: (state, action) => {
      state.ticketNumber = action.payload;
    },
    handleHoursPrint: (state, action) => {
      state.hoursPrinted = action.payload;
    },
    handleTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    handleTimer: (state, action) => {
      state.timer = action.payload;
    },

    handlePayment: (state, action) => {
      state.payment = action.payload;
    },

    handleOrderSpecs: (state, action) => {
      state.orderSpecsCurrent = action.payload;
    },

    handleIncrease: (state, action) => {
      const mealId = action.payload;

      state.orderSpecsCurrent.forEach((item) => {
        if (item.meal === mealId) {
          item.quantity += 1;
        }
      });
    },
    handleDecrease: (state, action) => {
      const mealId = action.payload;

      const mealItem = state.orderSpecsCurrent.find(
        (item) => item.meal === mealId
      );
      const mealItemIndex = state.orderSpecsCurrent.findIndex(
        (item) => item.meal === mealId
      );

      if (mealItem.quantity === 1) {
        state.orderSpecsCurrent.splice(mealItemIndex, 1);
      } else {
        state.orderSpecsCurrent.forEach((item) => {
          if (item.meal === mealId) {
            item.quantity -= 1;
          }
        });
      }
    },

    handleClear: (state, action) => {
      const mealId = action.payload;
      const mealItemIndex = state.orderSpecsCurrent.findIndex(
        (item) => item.meal === mealId
      );
      state.orderSpecsCurrent.splice(mealItemIndex, 1);
    },

    handleUpstreamOrder: (state, action) => {
      const e = action.payload;

      const mealID = e.target.parentElement.getAttribute("data-mealid");
      const mealName = e.target.parentElement.getAttribute("data-mealname");
      const mealPrice = e.target.parentElement.getAttribute("data-price");

      let orderItems = [];
      let indexItem = null;
      let qty = 0;
      if (state.orderSpecsCurrent === 0) {
        qty += 1;
        orderItems.push({
          meal: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
        });
      } else {
        indexItem = state.orderSpecsCurrent.findIndex(
          (item) => item.meal === mealID
        );
        if (indexItem) {
          let orderItem = state.orderSpecsCurrent[indexItem];

          orderItems = [
            ...state.orderSpecsCurrent,
            (state.orderSpecsCurrent[indexItem] = {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            }),
          ];
        } else {
          qty += 1;
          orderItems.push({
            meal: mealID,
            name: mealName,
            quantity: qty,
            price: mealPrice,
          });
        }
      }

      state.orderSpecsCurrent = orderItems;
    },

    wholeCountDownTimersDay: (state, action) => {
      const newTimer = action.payload;
      const oldArrTimers = state.countDownTimerArr;
      const nextIndex = oldArrTimers.length;
      let newArrTimers;
      newArrTimers = [...oldArrTimers, (oldArrTimers[nextIndex] = newTimer)];

      state.countDownTimerArr = newArrTimers;
    },
    handleTemplateOrdersDay: (state, action) => {
      const newTemplate = action.payload;
      const oldArrTemplate = state.dataTemplatesOrdersDay;
      const nextIndex = oldArrTemplate.length;
      let newArrTemplateOrders;
      newArrTemplateOrders = [
        ...oldArrTemplate,
        (oldArrTemplate[nextIndex] = newTemplate),
      ];
      state.dataTemplatesOrdersDay = newArrTemplateOrders;
    },
  },
});

//export actions changing initial state
export const templateActions = templateSlice.actions;

//export function reporting all states
/* export const recordAllTemplateSliceState = (state) => {
  const isNewLocation = state.orderPrime.isNewLocation;
  const firstTimeOrder = state.orderPrime.firstTimeOrder;
  const thisOrder = state.orderPrime.thisOrder;
  const ticketNumber = state.orderPrime.ticketNumber;
  const hoursPrinted = state.orderPrime.hoursPrinted;
  const totalPrice = state.orderPrime.totalPrice;
  const timer = state.orderPrime.timer;
  const payment = state.orderPrime.payment;
  const orderSpecsCurrent = state.orderPrime.orderSpecsCurrent;
  const countDownTimerArr = state.orderPrime.countDownTimerArr;
  const dataTemplatesOrdersDay = state.orderPrime.dataTemplatesOrdersDay;

  return {
    isNewLocation,
    firstTimeOrder,
    thisOrder,
    ticketNumber,
    hoursPrinted,
    totalPrice,
    timer,
    payment,
    orderSpecsCurrent,
    countDownTimerArr,
    dataTemplatesOrdersDay,
  };
}; */

export const isNewLocation_section = (state) => {
  return state.orderPrime.isNewLocation;
};

export const firstTimeOrder_section = (state) => {
  return state.orderPrime.firstTimeOrder;
};

export const thisOrder_section = (state) => {
  return state.orderPrime.thisOrder;
};

export const ticketNumber_section = (state) => {
  return state.orderPrime.ticketNumber;
};

export const hoursPrinted_section = (state) => {
  return state.orderPrime.hoursPrinted;
};

export const totalPrice_section = (state) => {
  return state.orderPrime.totalPrice;
};

export const timer_section = (state) => {
  return state.orderPrime.timer;
};

export const payment_section = (state) => {
  return state.orderPrime.payment;
};

export const orderSpecsCurrent_section = (state) => {
  console.log(
    "current state orderSpecsCurrent",
    state.orderPrime.orderSpecsCurrent
  );
  return state.orderPrime.orderSpecsCurrent;
};

export const countDownTimerArr_section = (state) => {
  return state.orderPrime.countDownTimerArr;
};

export const dataTemplatesOrdersDay_section = (state) => {
  return state.orderPrime.dataTemplatesOrdersDay;
};

/* export const recordAllTemplateSliceState = () => {
  return {s
    isNewLocation,
    firstTimeOrder,
    thisOrder,
    ticketNumber,
    hoursPrinted,
    totalPrice,
    timer,
    payment,
    orderSpecsCurrent,
    countDownTimerArr,
    dataTemplatesOrdersDay,
  };
}; */

export const recordAllTemplateSliceState = createSelector(
  [
    isNewLocation_section,
    firstTimeOrder_section,
    thisOrder_section,
    ticketNumber_section,
    hoursPrinted_section,
    totalPrice_section,
    timer_section,
    payment_section,
    orderSpecsCurrent_section,
    countDownTimerArr_section,
    dataTemplatesOrdersDay_section,
  ],
  (
    isNewLocation_data,
    firstTimeOrder_data,
    thisOrder_data,
    ticketNumber_data,
    hoursPrinted_data,
    totalPrice_data,
    timer_data,
    payment_data,
    orderSpecsCurrent_data,
    countDownTimerArr_data,
    dataTemplatesOrdersDay_data
  ) => {
    return {
      isNewLocation_data,
      firstTimeOrder_data,
      thisOrder_data,
      ticketNumber_data,
      hoursPrinted_data,
      totalPrice_data,
      timer_data,
      payment_data,
      orderSpecsCurrent_data,
      countDownTimerArr_data,
      dataTemplatesOrdersDay_data,
    };
  }
);

// export entire template
export default templateSlice;
