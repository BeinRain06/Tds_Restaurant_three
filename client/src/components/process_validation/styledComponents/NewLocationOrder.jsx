import React, {
  useRef,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import styled from "styled-components";
import {
  updateThisLocationOrder,
  updateThisTotalPriceOrder,
  checkTotalPriceOrder,
} from "../../../callAPI/OrdersApi";
import { TemplateContext } from "../../../services/context/TemplateContext";
import { ValidationContext } from "../../../services/context/ValidationContext";
import ErrorWarning from "./MsgError";
import { devices } from "./devices";

const NewLocation = styled.div`
  position: absolute;
  top: calc(4.5rem);
  left: 50%;
  transform: translate(-50%, 0);
  width: 70%;
  height: auto;
  padding: 1em 1em 0;
  background-color: #3b4d44;
  color: #fff;
  border-radius: 3px;

  @media ${devices.mobileXtraMini} {
    width: 96%;
  }

  @media ${devices.mobileMiniL} {
    width: 70%;
  }
`;
const Title = styled.span`
  padding: 0.25em 0;
  font-weight: bold;
  font-size: clamp(0.72rem, 1.15rem, 1.25rem);
`;

const Area = styled.ul`
  width: 90%;
  padding: 0.5rem 0.25rem;
  margin: 0.5rem auto 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media ${devices.mobileXtraMini} {
    width: 96%;
  }

  @media ${devices.mobileMiniL} {
    width: 90%;
  }
`;

const Li = styled.li`
  padding: 0.25em;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  font-size: 0.95em;
`;

const MoreInformation = styled.div`
  position: relative;
  width: 100%;
  margin: o auto;
`;

const NewDirection = styled.form`
  width: 96%;
  padding: 1rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media ${devices.mobileXtraMini} {
    flex-direction: column;
  }

  @media ${devices.mobileMiniL} {
    flex-direction: row-reverse;
  }

  @media ${devices.tablet} {
    width: 70%;
    flex-direction: row-reverse;
  }
`;

const LocationField = styled.ul`
  margin: 0.75rem 0rem;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media ${devices.mobileMiniL} {
    width: 60%;
  }
`;

const LiLocation = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const InputLocation = styled.input`
  width: 100%;
  height: 40px;
  color: #eee;
  background: #35463d;
  line-height: 1.3;
  font-size: clamp(0.9rem, 1rem, 1.15rem);
  display: flex;
  justify-content: center;
  text-indent: 10%;
  border: 2px solid #eee;

  @media ${devices.mobileXtraMini} {
    height: 24px;
  }

  @media ${devices.mobileMiniL} {
    height: 40px;
  }
`;

const ReadyToSendLoc = styled.ul`
  position: relative;
  padding: 0.5rem 0;
  width: 40%;
  margin: 0 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devices.mobileXtraMini} {
    width: 60%;
    gap: 1.25rem;
  }

  @media ${devices.mobileMiniL} {
    width: 40%;
    gap: 0rem;
  }
`;

const SpreadLoc = styled.li`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 0.25rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#1c7e4d" : "#d4cfcf")};
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: ${(props) => (props.$primary ? "2px solid #fff" : "2px solid gray")};
  width: 50px;
  height: 100%;
  padding: 0.25em;
  border-radius: 3px;

  @media ${devices.mobileXtraMini} {
    width: 60px;
    height: 38px;
  }
  @media ${devices.mobileMiniL} {
    width: 60px;
    height: 100%;
  }
`;

/* const ErrWarning = styled.p`
  position: absolute;
  top: 5.5rem;
  width: 90%;
  color: brown;
  background-color: #e7e697;
  padding: 0.25rem 1rem;
  font-size: clamp(0.65rem, 0.75rem, 0.8rem);
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  text-align: center;
  transition: all 1s ease-in-out;
`;

const MsgWarning = ({ message }) => {
  return <ErrWarning>{message}</ErrWarning>;
}; */

/* function NewLocationOrder() {
  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const closeFromNewLocation = () => {
    handleNewLocation(false);
 
  };

  const handleFirstStepLoc = (e) => {
    e.preventDefault();
    if (newRadioRefOne.current.checked) {
      let phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        handleNewLocation(false);
       
        return;
      }

      let city = "home";
      let street = "home";

      let newLocation = {
        phone: phone.value,
        city: city,
        street: street,
      };

      setDataNewLocation(newLocation);

      //close new location
      handleNewLocation(false);
     
      phone.value = "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        handleNewLocation(false);
        
        return;
      }
      let newlocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };
      setDataNewLocation(newlocation);

      //close new location box
      handleNewLocation(false);
     

      phone.value === "";
      city.value === "";
      street.value === "";

      //move to one more step
      oneMoreStepRef.current.style.visibility = "visible";
    }
  };

  const handleNewRadioInput = (e) => {
    if (e.target.id === "name_area_one") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "none";
      newStreetRef.current.style.display = "none";
    } else if (e.target.id === "name_area_two") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "block";
      newStreetRef.current.style.display = "block";
    }
  };
  return (
    <div className="wrapping_new_location">
      <span className="title_hold">Location</span>
      <ul className="figure_area" onChange={handleNewRadioInput}>
        <li>
          <input
            type="radio"
            name="location"
            id="name_area_one"
            className="name_area area_expected_one"
            ref={newRadioRefOne}
          />
          <label htmlFor="home">home</label>
        </li>
        <li>
          <input
            type="radio"
            name="location"
            id="name_area_two"
            className="name_area area_expected_two"
            ref={newRadioRefTwo}
          />
          <label htmlFor="home">new Location</label>
        </li>
      </ul>
      <div className="add_more_info">
        <form
          className="control_in_new_direction"
          onSubmit={handleFirstStepLoc}
        >
          <ul className="list_appearance" ref={newLocationRef}>
            <li className="adding_phone">
              <label htmlFor="phone"> add a number</label>
              <input
                type="number"
                name="newNum"
                id="number_add"
                className="number_add"
              />
            </li>
            <li className="adding_city" ref={newCityRef}>
              <label htmlFor="city">city</label>
              <input
                type="text"
                name="newCity"
                id="city_add"
                className="city_add"
              />
            </li>
            <li className="adding_street" ref={newStreetRef}>
              <label htmlFor="street">street</label>
              <input
                type="text"
                name="newStreet"
                id="street_add"
                className="street_add"
              />
            </li>
          </ul>

          <ul className="spread_new_button">
            <li id="spread_reject">
              <button
                type="button"
                className="btn_on_new btn_loc_one"
                onClick={closeFromNewLocation}
              >
                Reject
              </button>
            </li>
            <li id="spread_ok">
              <button type="submit" className="btn_on_new btn_loc_two">
                OK
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
} */

function NewLocationOrder() {
  const {
    state: { thisOrder, orderSpecsCurrent },
    handleNewLocation,
    handleTotalPrice,
    handleThisOrder,
  } = useContext(TemplateContext);

  const {
    state: { dataNewLocation },
    handleIsOneMoreStep,
    handleDataNewLocation,
  } = useContext(ValidationContext);

  const [msgErr, setMsgErr] = useState("");
  const [isAnyErr, setIsAnyPrevErr] = useState(false);
  const [newLocIn, setNewlocIn] = useState({});

  const newRadioRefOne = useRef(null);
  const newRadioRefTwo = useRef(null);

  const newLocationRef = useRef(null);
  const newCityRef = useRef(null);
  const newStreetRef = useRef(null);

  const closeFromNewLocation = () => {
    handleNewLocation(false);
  };

  const message =
    "can't proceed! You added element Meal(s) but didn't update totalPrice.";
  const forseen = false;

  function getCookies() {
    let cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, val] = cookie.split("=").map((c) => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
    return cookies;
  }

  const handleDataInSubmittion = async (e) => {
    e.preventDefault();

    const newTotalPrice = await checkingDataPrice();

    if (newTotalPrice === message) {
      /*  setIsAnyPrevErr(true); */
      setTimeout(() => {
        setMsgErr(message);
      }, 2000);
      setTimeout(() => {
        console.log("There is an previous Error somewhere in price...");
        setMsgErr("");
      }, 7500);
    } else {
      setMsgErr("");
      const newLoc = handleInSecondStepLoc(e);

      if (typeof newLoc === "string") {
        return;
      } // expect data object - newLoc: {...}

      console.log("new Location -ORDER-LOC-IN before UPDATE:", newLoc);
      const cookies = getCookies();
      const userId = cookies.userId;

      const updateLocationOrder = await updateThisLocationOrder(
        userId,
        newLoc,
        thisOrder._id
      );

      handleThisOrder(updateLocationOrder);
      console.log("Data in Submit Response:", updateLocationOrder);
    }
  };

  const checkingDataPrice = useCallback(async () => {
    return await new Promise(async (resolve, reject) => {
      const dataNewTotalPrice = await checkTotalPriceOrder(orderSpecsCurrent);
      console.log("this order total price:", thisOrder.totalPrice);
      console.log("this data new total price:", dataNewTotalPrice);

      if (+dataNewTotalPrice !== thisOrder.totalPrice) {
        resolve(message);
      } else {
        handleTotalPrice(thisOrder.totalPrice.toString());
        resolve(dataNewTotalPrice);
      }
    });
  }, []);

  const handleInSecondStepLoc = (e) => {
    let phone;
    if (newRadioRefOne.current.checked) {
      phone = e.target.elements.newNum;
      if (phone.value === "") {
        alert("Please Enter a phone number");
        handleNewLocation(false);
        const errNumber = "Error Number";

        return errNumber;
      }

      let city = "home";
      let street = "home";

      let newLocation = {
        phone: phone.value,
        city: city,
        street: street,
      };

      handleDataNewLocation(newLocation);

      //close new location
      handleNewLocation(false);
      phone.value = "";
      setMsgErr("");

      //move to one more step
      handleIsOneMoreStep(true);
      return newLocation;
    } else if (newRadioRefTwo.current.checked) {
      let phone = e.target.elements.newNum;
      let city = e.target.elements.newCity;
      let street = e.target.elements.newStreet;

      if (phone.value === "" || city.value === "" || street.value === "") {
        alert("Please Enter All the field");
        handleNewLocation(false);

        const errLoc = "Error Either in Number, City or Street";

        return errLoc;
      }

      let newLocation = {
        phone: phone.value,
        city: city.value,
        street: street.value,
      };

      handleDataNewLocation(newLocation);

      //close new location box
      handleNewLocation(false);

      phone.value === "";
      city.value === "";
      street.value === "";
      setMsgErr("");

      //move to one more step
      handleIsOneMoreStep(true);
      return newLocation;
    } else {
      setMsgErr("Select between home and new location First !");
      setTimeout(() => {
        setMsgErr("");
      }, 5000);
      return;
    }
  };

  const handleNewRadioInput = (e) => {
    if (e.target.id === "name_area_one") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "none";
      newStreetRef.current.style.display = "none";
    } else if (e.target.id === "name_area_two") {
      newLocationRef.current.style.visibility = "visible";
      newCityRef.current.style.display = "block";
      newStreetRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    if (msgErr !== "") console.log("refreshing nessage error");
  }, [msgErr]);

  return (
    <NewLocation>
      <Title>LOcation</Title>
      <Area onChange={handleNewRadioInput}>
        <Li>
          <Input
            type="radio"
            name="location"
            id="name_area_one"
            ref={newRadioRefOne}
          />
          <Label htmlFor="home">home</Label>
        </Li>
        <Li>
          <Input
            type="radio"
            name="location"
            id="name_area_two"
            ref={newRadioRefTwo}
          />
          <Label htmlFor="home">new location</Label>
        </Li>
      </Area>
      <MoreInformation>
        <NewDirection onSubmit={(e) => handleDataInSubmittion(e)}>
          <LocationField>
            <LiLocation ref={newLocationRef}>
              <Label htmlFor="phone">add Phone Number</Label>
              <InputLocation type="number" name="newNum" id="number_add" />
            </LiLocation>
            <LiLocation ref={newCityRef}>
              <Label htmlFor="city">city</Label>
              <InputLocation type="text" name="newCity" id="city_add" />
            </LiLocation>
            <LiLocation ref={newStreetRef}>
              <Label htmlFor="street">street</Label>
              <InputLocation type="text" name="newStreet" id="street_add" />
            </LiLocation>
          </LocationField>
          <ReadyToSendLoc>
            <SpreadLoc id="spread_reject">
              <Button type="button" onClick={closeFromNewLocation}>
                Reject
              </Button>
            </SpreadLoc>
            <SpreadLoc id="spread_ok">
              <Button $primary type="submit">
                Send
              </Button>
            </SpreadLoc>
            {/* {msgErr !== "" && <MsgWarning message={msgErr} />} */}
            {msgErr !== "" && (
              <ErrorWarning
                message={msgErr}
                componentSectionName="sendNewLocOrder"
                forseen={forseen}
              />
            )}
          </ReadyToSendLoc>
        </NewDirection>
      </MoreInformation>
    </NewLocation>
  );
}

export default NewLocationOrder;
