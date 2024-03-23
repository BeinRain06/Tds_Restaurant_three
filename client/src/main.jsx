import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MealContextProvider, {
  INITIAL_STATE,
} from "./services/context/MealsContext.jsx";
import DailyContextProvider, {
  INITIAL_STATE_TWO,
} from "./services/context/DailyContext.jsx";
import TemplateContextProvider, {
  INITIAL_STATE_ONE,
} from "./services/context/TemplateContext.jsx";
import ValidationContextProvider, {
  INIT_STATE,
} from "./services/context/ValidationContext.jsx";

import { Provider } from "react-redux";
import { store } from "./services/redux/store/store.jsx";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MealContextProvider {...INITIAL_STATE}>
        <TemplateContextProvider {...INITIAL_STATE_ONE}>
          <DailyContextProvider {...INITIAL_STATE_TWO}>
            <ValidationContextProvider {...INIT_STATE}>
              <App />
            </ValidationContextProvider>
          </DailyContextProvider>
        </TemplateContextProvider>
      </MealContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/* ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
); */
