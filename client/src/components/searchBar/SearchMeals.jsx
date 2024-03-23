import React from "react";
import {
  AdamIMG,
  AhmadIMG,
  MariaIMG,
  AnastasiyaIMG,
  NordwoodIMG,
  KEIPIGER,
  SHAWNAN,
} from "../assets/images/index.js";

import "./SearchMeals.css";

function SearchMeals() {
  /* response obtained from  searching Meals in navbar:
  NOT YET FULLY READY,
   to BE IMPLEMENT ==> FURTHER */

  return (
    <div className="welcome_search_meals">
      <p className="title_results">Results</p>
      <div className="results_meal_wrapper">
        <ul className="results_fetched">
          {/*  <p>
            instructions: [Javascript] - here - map collection of meals and
            return meal name that include the character entered in the input
            field
          </p>
          <p>
            you will make a get request to your api page containing meal
            collection
          </p> */}
          <li className="dish">
            <div className="dish_content">
              <img
                src={AnastasiyaIMG}
                className="my_dish_img"
                alt="dish missing"
              />

              <div className="spec_meal">
                <p className="name_meal">jutsu chicken</p>
                <div>
                  <ul className="rate_content">
                    <li>ratings: 4.6 </li>
                    <li className="ratings">
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
                <p>Italian</p>
              </div>
              <div className="spec_ingredients">
                <div className="side_ing">
                  <span className="title_ing">Ingredients</span>
                  <ul className="ingredients_used">
                    <li>Onions </li>
                    <li>Spices </li>
                    <li>Celeries</li>
                  </ul>
                </div>
                <div className="side_order">
                  <ul className="side_ct_order">
                    <li>
                      <p className="dish_price">$10</p>
                    </li>
                    <li>
                      <button type="button" className=" btn btn_order">
                        Order
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="dish">
            <div className="dish_content">
              <img
                src={AnastasiyaIMG}
                className="my_dish_img"
                alt="dish missing"
              />

              <div className="spec_meal">
                <p className="name_meal">jutsu chicken</p>
                <div>
                  <ul className="rate_content">
                    <li>ratings: 4.6 </li>
                    <li className="ratings">
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
                <p>Italian</p>
              </div>
              <div className="spec_ingredients">
                <div className="side_ing">
                  <span className="title_ing">Ingredients</span>
                  <ul className="ingredients_used">
                    <li>Onions </li>
                    <li>Spices </li>
                    <li>Celeries</li>
                  </ul>
                </div>
                <div className="side_order">
                  <ul className="side_ct_order">
                    <li>
                      <p className="dish_price">$10</p>
                    </li>
                    <li>
                      <button type="button" className=" btn btn_order">
                        Order
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="dish">
            <div className="dish_content">
              <img
                src={AnastasiyaIMG}
                className="my_dish_img"
                alt="dish missing"
              />

              <div className="spec_meal">
                <p className="name_meal">jutsu chicken</p>
                <div>
                  <ul className="rate_content">
                    <li>ratings: 4.6 </li>
                    <li className="ratings">
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
                <p>Italian</p>
              </div>
              <div className="spec_ingredients">
                <div className="side_ing">
                  <span className="title_ing">Ingredients</span>
                  <ul className="ingredients_used">
                    <li>Onions </li>
                    <li>Spices </li>
                    <li>Celeries</li>
                  </ul>
                </div>
                <div className="side_order">
                  <ul className="side_ct_order">
                    <li>
                      <p className="dish_price">$10</p>
                    </li>
                    <li>
                      <button type="button" className=" btn btn_order">
                        Order
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className="modal_search_container">
          <div className="search_container_visibility viewable">
            <div className="transform_before step_inside ">
              <div className="content_in_scale add_scale">
                <div className="hit_closing_btn">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="customers_notificications">
                  <div className="customers_entrance">
                    <div className="wrap_img_restaurant">
                      <img
                        src={SHAWNAN}
                        alt="no restaurant"
                        className="img_restaurant"
                      />
                    </div>
                    <div className="delivery_trend">
                      <img
                        src={KEIPIGER}
                        alt="workers view"
                        className="img_delivery_man"
                      />
                      <p className="customers_message">
                        ready and delivered in less than 02 hours
                      </p>
                    </div>
                  </div>
                  <div className="meal_dish">
                    <img
                      src={AhmadIMG}
                      alt="workers view"
                      className="img_meal"
                    />
                    <p className="dish_name">Jutsu Chicken</p>
                    <div className="story_dish">
                      <div className="align_story_left">
                        <div className="long_desc">
                          <p className="title_desc title_size">Description</p>
                          <p className="dish_desc">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Dicta, cum.
                          </p>
                        </div>
                      </div>
                      <div className="align_country_right">
                        <div className="originate_country">
                          <p className="title_country title_size">Origin</p>
                          <p className="name_country">Italian</p>
                        </div>
                      </div>
                    </div>
                    <div className="dish_command">
                      <div className="some_ingredients">
                        <p className="title_ingredients title_size">
                          Ingredients
                        </p>
                        <p className="added_ingredients">
                          Spices, Onions, Celeries
                        </p>
                      </div>
                      <div className="send_home">
                        <button
                          type="submit"
                          id="modal_btn_order"
                          className="modal_btn_order"
                        >
                          Order
                        </button>
                        {/*  --> style this page, right after correct also orders page component style .Thank You! */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMeals;
