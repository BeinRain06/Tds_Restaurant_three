import { createSlice, createSelector } from "@reduxjs/toolkit";

const dailySplice = createSlice({
  name: "dailyPrime",
  initialState: {
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
  },
  reducers: {
    handleLastActiveDay: (state, action) => {
      state.lastActiveDay = action.payload;
    },
    handleActiveDayWeek: (state, action) => {
      state.arrayDayWeeK = action.payload;
    },
    handleMondayMenu: (state, action) => {
      state.mondayMenu = action.payload;
    },
    handleEndThisVar: (state, action) => {
      state.endThisVar = action.payload;
    },
    handleSelectedMeats: (state, action) => {
      state.selectMeats = action.payload;
    },
    handleSelectedSeafoods: (state, action) => {
      state.selectSeafoods = action.payload;
    },
    handleSelectedDesserts: (state, action) => {
      state.selectDesserts = action.payload;
    },

    handleSelectedVegetarians: (state, action) => {
      state.selectVegetarians = action.payload;
    },
  },
});

//export actions changing state
export const dailyActions = dailySplice.actions;

console.log("dailySplice:", dailySplice);

export const selectMeats_section = (state) => {
  return state.dailyPrime.selectMeats;
};
export const selectSeafoods_section = (state) => {
  return state.dailyPrime.selectSeafoods;
};
export const selectVegetarians_section = (state) => {
  return state.dailyPrime.selectVegetarians;
};
export const selectDesserts_section = (state) => {
  return state.dailyPrime.selectDesserts;
};
export const endThisVar_section = (state) => {
  return state.dailyPrime.endThisVar;
};
export const mondayMenu_section = (state) => {
  return state.dailyPrime.mondayMenu;
};
export const lastActiveDay_section = (state) => {
  return state.dailyPrime.lastActiveDay;
};
export const arrayDayWeeK_section = (state) => {
  return state.dailyPrime.arrayDayWeeK;
};

/* export const recordAllDailySliceState = () => {
  return {
    selectMeats,
    selectSeafoods,
    selectVegetarians,
    selectDesserts,
    endThisVar,
    mondayMenu,
    lastActiveDay,
    arrayDayWeeK,
  };
}; */

/* export const recordAllDailySliceState = () => {
  return {
    selectMeats,
    selectSeafoods,
    selectVegetarians,
    selectDesserts,
    endThisVar,
    mondayMenu,
    lastActiveDay,
    arrayDayWeeK,
  };
}; */

export const recordAllDailySliceState = createSelector(
  [
    selectMeats_section,
    selectSeafoods_section,
    selectVegetarians_section,
    selectDesserts_section,
    endThisVar_section,
    mondayMenu_section,
    lastActiveDay_section,
    arrayDayWeeK_section,
  ],
  (
    selectMeats_data,
    selectSeafoods_data,
    selectVegetarians_data,
    selectDesserts_data,
    endThisVar_data,
    mondayMenu_data,
    lastActiveDay_data,
    arrayDayWeeK_data
  ) => {
    return {
      selectMeats_data,
      selectSeafoods_data,
      selectVegetarians_data,
      selectDesserts_data,
      endThisVar_data,
      mondayMenu_data,
      lastActiveDay_data,
      arrayDayWeeK_data,
    };
  }
);

//export entire dailySplice
export default dailySplice;
