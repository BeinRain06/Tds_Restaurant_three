import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/navbarLink/Home.jsx";
import FoodsDay from "./components/navbarLink/FoodsDay.jsx";
import Favourites from "./components/navbarLink/Favourites.jsx";
import Orders from "./components/navbarLink/Orders.jsx";
import Events from "./components/navbarLink/Events.jsx";

import Welcome from "./components/loading/welcome.jsx";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="" element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="day" element={<FoodsDay />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="orders" element={<Orders />} />
        <Route path="events" element={<Events />} />
        {/*         <Route path="events" element={<SearchMeals />} /> */}
        <Route path="*" element={<NoMatch />} />
      </Route>

      {/* <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="day" element={<FoodsDay />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="orders" element={<Orders />} />
        <Route path="events" element={<Events />} />
                <Route path="events" element={<SearchMeals />} />
        <Route path="*" element={<NoMatch />} />
      </Route> */}
    </Routes>
  );
}

const NoMatch = () => {
  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      Error 404. Page Not Found !
    </div>
  );
};

export default App;
