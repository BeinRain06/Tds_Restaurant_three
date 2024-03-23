import { createSlice, createSelector } from "@reduxjs/toolkit";

import moment from "moment";

const mealSplice = createSlice({
  name: "mealPrime",
  initialState: {
    meals: [],
    users: [],
    user: {},
    seaFoods: [],
    meats: [],
    vegetarians: [],
    desserts: [],
    orders: [],
    ratings: [],
    openWeek: false,
    indexDayFormat: "",
    openTagRatings: false,
    registerForm: {},
    loginForm: {},
    welcome: true,
  },
  reducers: {
    handleMeals: (state, action) => {
      state.meals = action.payload;
    },
    handleVegetarians: (state, action) => {
      state.vegetarians = action.payload;
    },
    handleDesserts: (state, action) => {
      state.desserts = action.payload;
    },
    handleMeats: (state, action) => {
      state.meats = action.payload;
    },
    handleSeaFoods: (state, action) => {
      state.seaFoods = action.payload;
    },
    handleOrders: (state, action) => {
      state.orders = action.payload;
    },
    handleUser: (state, action) => {
      state.user = action.payload;
    },
    handleDayShift: (state, action) => {
      const e = action.payload;
      const i = e.target.id;
      let current = moment().startof("week").add(i, "days");
      state.indexDayFormat = current.format("MMM D");
    },
    handleOpenTagsRatings: (state, action) => {
      state.openTagRatings = action.payload;
    },
    handleRatings: (state, action) => {
      state.ratings = action.payload;
    },
    handleRegisterForm: (state, action) => {
      state.loginForm = action.payload;
      handleOpenTagsRatings();
    },
    handleWelcome: (state, action) => {
      state.welcome = action.payload;
    },
  },
});

//export actions changing state
export const mealActions = mealSplice.actions;

//export Fn reporting entire state

export const meals_section = (state) => {
  console.log("state mealPrime", state);
  return state.mealPrime.meals;
};

export const users_section = (state) => {
  return state.mealPrime.users;
};

export const user_section = (state) => {
  return state.mealPrime.user;
};

export const seaFoods_section = (state) => {
  return state.mealPrime.seaFoods;
};

export const meats_section = (state) => {
  return state.mealPrime.meats;
};

export const vegetarians_section = (state) => {
  return state.mealPrime.vegetarians;
};

export const desserts_section = (state) => {
  return state.mealPrime.desserts;
};

export const orders_section = (state) => {
  return state.mealPrime.orders;
};

export const ratings_section = (state) => {
  return state.mealPrime.ratings;
};

export const openWeek_section = (state) => {
  return state.mealPrime.openWeek;
};

export const indexDayFormat_section = (state) => {
  return state.mealPrime.indexDayFormat;
};

export const openTagRatings_section = (state) => {
  return state.mealPrime.openTagRatings;
};

export const registerForm_section = (state) => {
  return state.mealPrime.registerForm;
};

export const loginForm_section = (state) => {
  return state.mealPrime.loginForm;
};

export const welcome_section = (state) => {
  return state.mealPrime.welcome;
};

export const recordAllMealSliceState = createSelector(
  [
    meals_section,
    users_section,
    user_section,
    seaFoods_section,
    meats_section,
    vegetarians_section,
    desserts_section,
    orders_section,
    ratings_section,
    openWeek_section,
    indexDayFormat_section,
    openTagRatings_section,
    registerForm_section,
    loginForm_section,
    welcome_section,
  ],
  (
    meals_data,
    users_data,
    user_data,
    seaFoods_data,
    meats_data,
    vegetarians_data,
    desserts_data,
    orders_data,
    ratings_data,
    openWeek_data,
    indexDayFormat_data,
    openTagRatings_data,
    registerForm_data,
    loginForm_data,
    welcome_data
  ) => {
    return {
      meals_data,
      users_data,
      user_data,
      seaFoods_data,
      meats_data,
      vegetarians_data,
      desserts_data,
      orders_data,
      ratings_data,
      openWeek_data,
      indexDayFormat_data,
      openTagRatings_data,
      registerForm_data,
      loginForm_data,
      welcome_data,
    };
  }
);

//export the entire slice
export default mealSplice;
