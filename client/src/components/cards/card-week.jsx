import React, { useRef, useEffect, useContext, useState } from "react";
import { TemplateContext } from "../../services/context/TemplateContext";
import { MealContext } from "../../services/context/MealsContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import moment from "moment";
import "./card-week.css";

// function javascript action in Card Week;
function CardWeek() {
  const {
    state: { indexWeekDay },
    handleIndexWeekDay,
  } = useContext(ValidationContext);

  const [tmpIndexWeek, setTmpIndexWeek] = useState([0, 1, 2, 3, 4, 5, 6]);

  const liRef_0 = useRef(null);
  const liRef_1 = useRef(null);
  const liRef_2 = useRef(null);
  const liRef_3 = useRef(null);
  const liRef_4 = useRef(null);
  const liRef_5 = useRef(null);
  const liRef_6 = useRef(null);

  const liArrRef = [
    liRef_0,
    liRef_1,
    liRef_2,
    liRef_3,
    liRef_4,
    liRef_5,
    liRef_6,
  ];

  const handleWhileShiftingDay = (e) => {
    const idTriggered = e.target.parentElement.parentElement.id;
    console.log("e target:", e.target.parentElement.parentElement);

    liArrRef.map((itemRef, i) => {
      console.log("itemRef Current:", itemRef);

      if (itemRef.current.id === idTriggered) {
        itemRef.current.classList.add("active_day");

        const newPrevIndexActiveDay = moment().weekday(i).format("d");

        handleIndexWeekDay(newPrevIndexActiveDay);
      } else {
        itemRef.current.classList.remove("active_day");
      }
    });
  };

  return (
    <>
      {tmpIndexWeek.map((day, i) => {
        return (
          <li
            key={day}
            id={day}
            className="weeks_day_li"
            data-value={moment().weekday(i).format("d")}
            ref={liArrRef[i]}
            onClick={(e) => handleWhileShiftingDay(e)}
          >
            <div className="spread_week_ct">
              <span>{moment().weekday(i).format("ddd")}</span>
              <span className="day_count">
                {moment().weekday(i).format("DD")}
              </span>
            </div>
          </li>
        );
      })}
    </>
  );
}

export default CardWeek;
