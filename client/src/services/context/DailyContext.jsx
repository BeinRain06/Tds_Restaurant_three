import React, { createContext, useCallback, useReducer } from "react";

export const INITIAL_STATE_TWO = {
  selectMeats: [],
  selectSeafoods: [],
  selectVegetarians: [],
  selectDesserts: [],
  endThisVar: "Meats",
  mondayMenu: {},
  lastActiveDay: {
    day: "Mon",
    isActive: true,
    index: 0,
  },

  arrayDayWeeK: [
    {
      day: "Mon",
      isActive: true,
      index: 0,
    },
    {
      day: "Tue",
      isActive: false,
      index: 0,
    },
    {
      day: "Wed",
      isActive: false,
      index: 0,
    },
    {
      day: "Thu",
      isActive: false,
      index: 0,
    },
    {
      day: "Fri",
      isActive: false,
      index: 0,
    },
    {
      day: "Sat",
      isActive: false,
      index: 0,
    },
    {
      day: "Sun",
      isActive: false,
      index: 0,
    },
  ],
};

export const ACTIONS_TYPES = {
  LAST_ACTIVE: "LAST_ACTIVE",
  ARRAY_DAY_WEEK: "ARRAY_WEEK",
  END_THIS_VAR: "END_THIS_VAR",
  MONDAY_MENU: "MONDAY_MENU",
  MEATS_CHOICE: "MEATS_CHOICE",
  SEAFOODS_CHOICE: "SEAFOODS_CHOICE",
  VEGETARIANS_CHOICE: "VEGETARIANS_CHOICE",
  DESSERTS_CHOICE: "DESSERTS_CHOICE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.LAST_ACTIVE:
      return { ...state, lastActiveDay: action.payload };

    case ACTIONS_TYPES.ARRAY_DAY_WEEK:
      return { ...state, arrayDayWeeK: action.payload };

    case ACTIONS_TYPES.END_THIS_VAR:
      return { ...state, endThisVar: action.payload };

    case ACTIONS_TYPES.MONDAY_MENU:
      return { ...state, mondayMenu: action.payload };

    case ACTIONS_TYPES.MEATS_CHOICE:
      return { ...state, selectMeats: action.payload };

    case ACTIONS_TYPES.SEAFOODS_CHOICE:
      return { ...state, selectSeafoods: action.payload };

    case ACTIONS_TYPES.VEGETARIANS_CHOICE:
      return { ...state, selectVegetarians: action.payload };

    case ACTIONS_TYPES.DESSERTS_CHOICE:
      return { ...state, selectDesserts: action.payload };

    default:
      throw new Error("Something went wrong ");
  }
};

const dailyContextDataExit = (INITIAL_STATE_TWO) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_TWO);

  const handleLastActiveDay = useCallback((newItem) => {
    dispatch({ type: ACTIONS_TYPES.LAST_ACTIVE, payload: newItem });
  }, []);

  const handleActiveDayWeek = useCallback((newDay) => {
    dispatch({ type: ACTIONS_TYPES.ARRAY_DAY_WEEK, payload: newDay });
  }, []);

  const handleMondayMenu = useCallback((setMenu) => {
    dispatch({ type: ACTIONS_TYPES.MONDAY_MENU, payload: setMenu });
  }, []);

  const handleEndThisVar = useCallback((newItem) => {
    dispatch({ type: ACTIONS_TYPES.END_THIS_VAR, payload: newItem });
  }, []);

  const handleSelectedMeats = useCallback((newMeats) => {
    dispatch({ type: ACTIONS_TYPES.MEATS_CHOICE, payload: newMeats });
  }, []);

  const handleSelectedSeafoods = useCallback((newSeafoods) => {
    dispatch({ type: ACTIONS_TYPES.SEAFOODS_CHOICE, payload: newSeafoods });
  }, []);

  const handleSelectedDesserts = useCallback((newDesserts) => {
    dispatch({ type: ACTIONS_TYPES.DESSERTS_CHOICE, payload: newDesserts });
  }, []);

  const handleSelectedVegetarians = useCallback((newVegetarians) => {
    dispatch({
      type: ACTIONS_TYPES.VEGETARIANS_CHOICE,
      payload: newVegetarians,
    });
  }, []);

  return {
    state,
    handleLastActiveDay,
    handleActiveDayWeek,
    handleEndThisVar,
    handleMondayMenu,
    handleSelectedMeats,
    handleSelectedSeafoods,
    handleSelectedVegetarians,
    handleSelectedDesserts,
  };
};

const initState = {
  state: INITIAL_STATE_TWO,
  handleActiveDayWeek: () => {},
  handleLastActiveDay: () => {},
  handleEndThisVar: () => {},
  handleMondayMenu: () => {},
  handleSelectedMeats: () => {},
  handleSelectedSeafoods: () => {},
  handleSelectedVegetarians: () => {},
  handleSelectedDesserts: () => {},
};

export const DailyContext = createContext(initState);

function DailyContextProvider({ children, ...INITIAL_STATE_TWO }) {
  return (
    <DailyContext.Provider value={dailyContextDataExit(INITIAL_STATE_TWO)}>
      {children}
    </DailyContext.Provider>
  );
}
export default DailyContextProvider;
