import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mealActions } from "../../services/redux/createslice/MealSplice";
import { MealContext } from "../../services/context/MealsContext";
import { AhmadIMG, SHAWNAN, MTN, ORANGE } from "../../assets/images";
import "./Favourites.css";

function Favourites() {
  /* const dispatch = useDispatch(); */
  const { handleWelcome } = useContext(MealContext);
  useEffect(() => {
    console.log("present navbar");
    setTimeout(() => {
      handleWelcome(false);
      /*  dispatch(mealActions.handleWelcome(false)); */
    }, 3000);
  }, []);
  return (
    <main className="welcome_favourites">
      <div className="welcome_cont">
        <p className="title_favourite">Favourites</p>
        <ul className="three_selected_dishes ">
          <li className="favourite row">
            <p className="country_side row_side">
              <span className="title_dish">Jutsu Chicken</span>
              <span className="dish_country">Italian</span>
            </p>
            <div className="origin">
              <article className="flex-column">
                <div>
                  <p className="origin_story">
                    End year celebration are around Jutsu Chicken especially in
                    the Italian's town of Hampalya. The king Salif when comes to
                    win the war against halpheo's kingdom in 1657, made a
                    national feast where he reommended to his cooker to make him
                    new dishes. The chief cooker Moloungui made a food about
                    chicken and jutsu well appreciated by the king that state
                    this food like the dish year foods of Hampalya.
                  </p>
                </div>
                <div>
                  <img
                    src={AhmadIMG}
                    className="img_favourite"
                    alt="story creation"
                  />
                </div>
              </article>
            </div>
          </li>
          <li className="favourite row_reverse">
            <p className="country_side row_side_reverse">
              <span className="title_dish">Jutsu Chicken</span>
              <span className="dish_country">Italian</span>
            </p>
            <div className="origin">
              <article className="flex-column">
                <div>
                  <p className="origin_story">
                    End year celebration are around Jutsu Chicken especially in
                    the Italian's town of Hampalya. The king Salif when comes to
                    win the war against halpheo's kingdom in 1657, made a
                    national feast where he reommended to his cooker to make him
                    new dishes. The chief cooker Moloungui made a food about
                    chicken and jutsu well appreciated by the king that state
                    this food like the dish year foods of Hampalya.
                  </p>
                </div>
                <div>
                  <img
                    src={AhmadIMG}
                    className="img_favourite"
                    alt="story creation"
                  />
                </div>
              </article>
            </div>
          </li>
          <li className="favourite row">
            <p className="country_side row_side">
              <span className="title_dish">Jutsu Chicken</span>
              <span className="dish_country">Italian</span>
            </p>
            <div className="origin">
              <article className="flex-column">
                <div>
                  <p className="origin_story">
                    End year celebration are around Jutsu Chicken especially in
                    the Italian's town of Hampalya. The king Salif when comes to
                    win the war against halpheo's kingdom in 1657, made a
                    national feast where he reommended to his cooker to make him
                    new dishes. The chief cooker Moloungui made a food about
                    chicken and jutsu well appreciated by the king that state
                    this food like the dish year foods of Hampalya.
                  </p>
                </div>
                <div>
                  <img
                    src={AhmadIMG}
                    className="img_favourite"
                    alt="story creation"
                  />
                </div>
              </article>
            </div>
          </li>
        </ul>

        <div className="game_dish">
          <p className="title_favourite made_game">Fourth Meal Game</p>
          <article className="flex-column">
            <div className="main_rule_game">
              <div className="rule_left_area">
                <p className="main_rule">You can command 03 meals! </p>
                <p className="main_rule">Two similar</p>
                <p className="main_rule">And the Third random</p>
              </div>
              <div className="rule_right_area">
                <img src={SHAWNAN} className="rule_img" alt="game seaside" />
              </div>
            </div>
            <div className="additional_rule_game flex-column">
              <p className="ending_main_rule">
                And Try to win a fourth Meal along with playing our mini-quizz
              </p>
              <p className="additional_rule">
                You may command as well three differents meals and try to gain
                \extra take-in ingredients for you meal
              </p>
            </div>
          </article>
        </div>

        <div className="welcome_end_greetings">
          <p className="end_greetings">
            On your Joy! Thanks You for trusting TDs Services
          </p>
        </div>
      </div>
    </main>
  );
}

export default Favourites;
