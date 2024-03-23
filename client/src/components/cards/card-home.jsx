import React from "react";

import Button from "../button/button-shape";
/* import "./card-home.css"; */

function CardHome({ ...props }) {
  return (
    <li key={props.id} className="dish" onClick={(e) => console.log(e.target)}>
      <div className="dish_content flex-row">
        <img src={props.image} className="my_dish_img" alt="dish missing" />

        <div className="spec_meal">
          <p className="name_meal">{props.name} </p>
          <div>
            <ul className="rate_content">
              <li key={props.name} className="ratings_score">
                ratings: {props.ratings}
              </li>
              <li key={props.id} className="ratings">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star-half-stroke"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="spec_country">
          <p>{props.origin}</p>
        </div>
        <div className="spec_ingredients">
          <div className="side_ing">
            <span className="title_ing">Ingredients</span>
            <ul className="ingredients_used .flex-row ">
              {props.ingredients.split().map((ingredient, i) => {
                return <li key={i}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className="side_order ">
            <ul className="side_ct_order ">
              <li>
                <p className="dish_price">${props.price}</p>
              </li>
              <Button
                mealid={props.id}
                mealname={props.name}
                mealprice={props.price}
                mealimg={props.image}
                originmeal={props.origin}
              />
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardHome;
