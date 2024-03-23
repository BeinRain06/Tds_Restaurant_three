import { configureStore } from "@reduxjs/toolkit";

import { loadState } from "../../localStorage/loadState";
import { saveState } from "../../localStorage/saveState";

import dailySplice from "../createslice/DailySplice";

import mealSplice from "../createslice/MealSplice";

import templateSlice from "../createslice/TemplateSlice";

const localStorageMiddleware = () => {
  return (next) => (action) => {
    const result = next(action);
    saveState(store);
    return result;
  };
};

export const store = configureStore({
  reducer: {
    orderPrime: templateSlice.reducer,
    mealPrime: mealSplice.reducer,
    dailyPrime: dailySplice.reducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

/* getDefaultMiddleware({
  serializableCheck: false,
}).concat(localStorageMiddleware); */
