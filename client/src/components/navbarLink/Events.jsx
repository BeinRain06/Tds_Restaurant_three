import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MealContext } from "../../services/context/MealsContext";
import { mealActions } from "../../services/redux/createslice/MealSplice";
import "./Events.css";

{
  /* <i className="fa-brands fa-facebook-f"></i>;
<i className="fa-brands fa-twitter"></i>;
<i className="fa-brands fa-instagram"></i>; */
}

function Events() {
  /*  const dispatch = useDispatch(); */

  const { handleWelcome } = useContext(MealContext);

  useEffect(() => {
    console.log("present navbar");
    setTimeout(() => {
      /*  dispatch(mealActions.handleWelcome(false)); */
      handleWelcome(false);
    }, 3000);
  }, []);

  return (
    <>
      <main className="welcome_events">
        <h3 className="events_main_title">Events</h3>
        <div className="events_wrapper flex-column">
          <div className="event_number_one">
            <div className="event_img_one"></div>
            <div className="event_content">
              <div className="event_one flex-row">
                <h4 className="title_event">Seminary Foods :</h4>
                <p>
                  Our Experts will teach you about which types of Foods do the
                  body need to be healthy. They will share tips on how to
                  balance your diet, give you some recipes, and helps you know
                  how to plant specific foods going along with the natural and
                  chemical fertilixer that might be necessary to expect great
                  harvests
                </p>
              </div>
            </div>
          </div>

          <div className="event_number_two">
            <div className="event_img_two"></div>
            <div className="event_content">
              <div className="event_two flex-row">
                <h4 className="title_event">Discount Months :</h4>
                <p>
                  visit the website regularly and get news about our free months
                  discount. Each time you spend time ordering meals during the
                  first three days of a discount Month. You will receive a lot
                  of special foods.
                </p>
              </div>
            </div>
          </div>

          <div className="event_number_three">
            <div className="event_img_three"></div>
            <div className="event_content">
              <div className="event_three flex-row">
                <h4 className="title_event">Race Party :</h4>
                <p>
                  Collect sixty meals order with us within the eight first month
                  of a year and get two free pass to participate on our racing
                  party. Each customers earning this right will be sent an
                  invitation between one month before the event
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div id="contacts">
          <div className="contacts_wrapper flex-column">
            <h3 className="contacts_title">CONTACTS</h3>
            <div className="location_brand">
              <p>In your Joy, Thanks you for trusting TDs</p>

              <p>
                Visit our Restaurant TopDishes based on{" "}
                <span style={{ color: "#d83dbe" }}>MakDeYounD</span>
              </p>
            </div>
            <ul className="friendship_brand flex-row">
              <li className="online_contact">
                <i className="fa-brands fa-facebook-f"></i>
                <span className="friendship_label">Facebook</span>
              </li>
              <li className="online_contact flex-column">
                <i className="fa-brands fa-twitter"></i>
                <span className="friendship_label">Twitter</span>
              </li>
              <li className="online_contact">
                <i className="fa-brands fa-instagram"></i>
                <span className="friendship_label">Instagram</span>
              </li>
            </ul>
            <div className="brand_rights">
              <div className="rights_wrapper ">
                <p className="privacy_terms">Terms Privacy</p>
                <div className="copyright">
                  <span>Copyright</span> <span>&copy;</span>
                  <span>2015 -2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Events;
