import React, { useReducer } from "react";

//process valisation hook
const INIT_STATE = {
  isAnOrderDay: false,
  openFinalValidation: false,
  isOneMoreStep: false,
  applyText: "Apply",
  forseen: false,
  componentSectionName: "",
  messageError: "",
  isError: false,
  timerIn: "00:00:00",
};

const ACTIONS_TYPES = {
  AN_ORDER_DAY: "AN_ORDER_DAY",
  OPEN_FINAL: "OPEN_FINAL",
  ONE_MORE_STEP: "ONE_MORE_STEP",
  APPLY_TEXT: "APPLY_TEXT",
  FOR_SEEN: "FOR_SEEN",
  SECTION_NAME: "SECTION_NAME",
  MSG_ERROR: "MSG_ERROR",
  IS_ERROR: "IS_ERROR",
  TIMER_IN: "TIMER_IN",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.AN_ORDER_DAY:
      return { ...state, isAnOrderDay: action.payload };
    case ACTIONS_TYPES.OPEN_FINAL:
      return { ...state, openFinalValidation: action.payload };
    case ACTIONS_TYPES.ONE_MORE_STEP:
      return { ...state, isOneMoreStep: action.payload };
    case ACTIONS_TYPES.APPLY_TEXT:
      return { ...state, applyText: action.payload };
    case ACTIONS_TYPES.FOR_SEEN:
      return { ...state, forseen: action.payload };
    case ACTIONS_TYPES.SECTION_NAME:
      return { ...state, componentSectionName: action.payload };
    case ACTIONS_TYPES.MSG_ERROR:
      return { ...state, messageError: action.payload };
    case ACTIONS_TYPES.IS_ERROR:
      return { ...state, isError: action.payload };
    case ACTIONS_TYPES.TIMER_IN:
      return { ...state, timerIn: action.payload };
    default:
      throw new Error("Something wrong in case type");
  }
};
