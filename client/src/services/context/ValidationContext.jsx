import React, { useReducer, useCallback, createContext } from "react";
import moment from "moment";

//process valisation hook
export const INIT_STATE = {
  indexWeekDay: moment().weekday(0).format("d"),
  dataNewLocation: {},
  openFinalValidation: false,
  isOneMoreStep: false,
  applyText: "Apply",
  boardTemplateText: {
    0: "Minimize",
    1: "Minimize",
    2: "Minimize",
  },
  countClickValidate: -1,
  forseen: false,
  componentSectionName: "",
  messageError: "",
  isError: false,
  timerIn: {},
  isEndWatchingTimer: false,
  isPaid: false,
};

const ACTIONS_TYPES = {
  INDEX_WEEK_DAY: "AN_ORDER_DAY",
  DATA_NEW_LOC: "DATA_NEW_LOC",
  OPEN_FINAL: "OPEN_FINAL",
  ONE_MORE_STEP: "ONE_MORE_STEP",
  APPLY_TEXT: "APPLY_TEXT",
  BOARD_TEXT: "BOARD_TEXT",
  CLICK_VALIDATE: "CLICK_VALIDATE",
  FOR_SEEN: "FOR_SEEN",
  SECTION_NAME: "SECTION_NAME",
  MSG_ERROR: "MSG_ERROR",
  IS_ERROR: "IS_ERROR",
  TIMER_IN: "TIMER_IN",
  IS_PAID: "IS_PAID",
  END_WATCHING_TIMER: "END_WATCHING_TIMER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INDEX_WEEK_DAY:
      return { ...state, indexWeekDay: action.payload };

    case ACTIONS_TYPES.DATA_NEW_LOC:
      return { ...state, dataNewLocation: action.payload };

    case ACTIONS_TYPES.OPEN_FINAL:
      return { ...state, openFinalValidation: !state.openFinalValidation };

    case ACTIONS_TYPES.ONE_MORE_STEP:
      return { ...state, isOneMoreStep: !state.isOneMoreStep };

    case ACTIONS_TYPES.APPLY_TEXT:
      return { ...state, applyText: action.payload };

    case ACTIONS_TYPES.BOARD_TEXT:
      return { ...state, boardTemplateText: action.payload };

    case ACTIONS_TYPES.CLICK_VALIDATE:
      return { ...state, countClickValidate: action.payload };
    case ACTIONS_TYPES.FOR_SEEN:
      return { ...state, forseen: !state.forseen };

    case ACTIONS_TYPES.SECTION_NAME:
      return { ...state, componentSectionName: action.payload };

    case ACTIONS_TYPES.MSG_ERROR:
      return { ...state, messageError: action.payload };

    case ACTIONS_TYPES.IS_ERROR:
      return { ...state, isError: !state.isError };

    case ACTIONS_TYPES.TIMER_IN:
      return { ...state, timerIn: action.payload };

    case ACTIONS_TYPES.END_WATCHING_TIMER:
      return { ...state, isEndWatchingTimer: action.payload };

    case ACTIONS_TYPES.IS_PAID:
      return { ...state, isPaid: action.payload };

    default:
      throw new Error("Something wrong in case type");
  }
};

const functionsValidationContext = (INIT_STATE) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const handleIndexWeekDay = useCallback(async (indexDay) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.INDEX_WEEK_DAY,
        payload: indexDay,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleDataNewLocation = useCallback(async (newArea) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.DATA_NEW_LOC,
        payload: newArea,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleOpenFinalValidation = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.OPEN_FINAL,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleIsOneMoreStep = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.ONE_MORE_STEP,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleApplyText = useCallback(async (newText) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.APPLY_TEXT,
        payload: newText,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleBoardText = useCallback(async (newObj) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.BOARD_TEXT,
        payload: newObj,
      });

      setTimeout(resolve, 3000);
    });
  }, []);

  const handleForSeen = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.FOR_SEEN,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleCountClickValidate = useCallback(async (updateCount) => {
    return await new Promise((resolve) => {
      dispatch({ type: ACTIONS_TYPES.CLICK_VALIDATE, payload: updateCount });
      setTimeout(resolve, 3000);
    });
  }, []);

  const handleSectionName = useCallback(async (sectionName) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.SECTION_NAME,
        payload: sectionName,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleMessageError = useCallback(async (message) => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.MSG_ERROR,
        payload: message,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleIsError = useCallback(async () => {
    return await new Promise((resolve) => {
      dispatch({
        type: ACTIONS_TYPES.IS_ERROR,
      });

      setTimeout(resolve, 1000);
    });
  }, []);

  const handleIsEndWatchingTimer = useCallback(async (endWatch) => {
    return await new Promise((resolve) => {
      /* console.log("endWatch:", endWatch); */

      dispatch({
        type: ACTIONS_TYPES.END_WATCHING_TIMER,
        payload: endWatch,
      });

      setTimeout(resolve, 4000);
    });
  }, []);

  const handleIsPaid = useCallback(async (isBillPaid) => {
    return await new Promise((resolve) => {
      /* console.log("isBillPaid:", isBillPaid); */

      dispatch({
        type: ACTIONS_TYPES.TIMER_IN,
        payload: isBillPaid,
      });

      setTimeout(resolve, 4000);
    });
  }, []);

  const handleTimerIn = useCallback(async (timerClock) => {
    return await new Promise((resolve) => {
      /* console.log("timerClock:", timerClock); */

      dispatch({
        type: ACTIONS_TYPES.TIMER_IN,
        payload: timerClock,
      });

      setTimeout(resolve, 4000);
    });
  }, []);

  return {
    state,
    handleIndexWeekDay,
    handleDataNewLocation,
    handleOpenFinalValidation,
    handleIsOneMoreStep,
    handleIsEndWatchingTimer,
    handleIsPaid,
    handleApplyText,
    handleBoardText,
    handleCountClickValidate,
    handleForSeen,
    handleSectionName,
    handleMessageError,
    handleIsError,
    handleTimerIn,
  };
};

const initStateContext = {
  state: INIT_STATE,
  handleIndexWeekDay: () => {},
  handleDataNewLocation: () => {},
  handleOpenFinalValidation: () => {},
  handleIsOneMoreStep: () => {},
  handleIsEndWatchingTimer: () => {},
  handleApplyText: () => {},
  handleBoardText: () => {},
  handleCountClickValidate: () => {},
  handleForSeen: () => {},
  handleSectionName: () => {},
  handleIsPaid: () => {},
  handleMessageError: () => {},
  handleIsError: () => {},
  handleTimerIn: () => {},
};

export const ValidationContext = createContext(initStateContext);

function ValidationContextProvider({ children, ...INIT_STATE }) {
  return (
    <ValidationContext.Provider value={functionsValidationContext(INIT_STATE)}>
      {children}
    </ValidationContext.Provider>
  );
}

export default ValidationContextProvider;
