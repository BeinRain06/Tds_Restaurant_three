import React, { useState, useEffect, useContext, useCallback } from "react";
import { TemplateContext } from "../../services/context/TemplateContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import "./button-shape.css";

export const Ordered = ({
  mealid,
  mealname,
  mealprice,
  mealimg,
  originmeal,
  setIsCliked,
}) => {
  const {
    state: { countClickValidate },
  } = useContext(ValidationContext);

  const [waiting, setWaiting] = useState(true);

  if (countClickValidate === 2) {
    alert("Your room is Full ! You can't send more than 3£ orders once.");
    return;
  }

  if (countClickValidate <= 1) {
    return (
      <ul className="order_confirmation">
        {waiting ? (
          <TimeAwait setWaiting={setWaiting} />
        ) : (
          <>
            <li className="btn_confirm_order">
              <Confirm
                mealid={mealid}
                mealname={mealname}
                mealprice={mealprice}
                mealimg={mealimg}
                originmeal={originmeal}
                setIsCliked={setIsCliked}
                countClick={countClickValidate}
              />
            </li>
            <li className="btn_reject_order">
              <Reject setIsCliked={setIsCliked} />
            </li>
          </>
        )}
      </ul>
    );
  }
};

export const Confirm = ({
  mealid,
  mealname,
  mealprice,
  mealimg,
  originmeal,
  setIsCliked,
  countClick,
}) => {
  const {
    state: { orderSpecsCurrent, dataTemplatesOrdersDay },
    handleOrderSpecs,
    handleNewLocation,
    handleTemplateOrdersDay,
  } = useContext(TemplateContext);

  const getUpdatingTemplateDay = useCallback((items) => {
    if (countClick >= 0) {
      let dataRecordObj = {
        orderSpecsCurrent: items,
        payment: {},
      };
      const indexTemplate = countClick + 1;

      const updating = {
        ...dataTemplatesOrdersDay,
        [indexTemplate]: dataRecordObj,
      };

      handleTemplateOrdersDay(updating);
    }
  }, []);

  const buildOrderItem = () => {
    const mealID = mealid;
    const mealName = mealname;
    const mealPrice = mealprice;
    const mealImg = mealimg;
    const originMeal = originmeal;
    console.log("originMeal: ", originMeal);

    let orderItems = [];
    let indexItem = null;
    let qty = 0;

    if (orderSpecsCurrent.length === 0) {
      qty += 1;

      orderItems = [
        ...orderItems,
        {
          id: mealID,
          name: mealName,
          quantity: qty,
          price: mealPrice,
          image: mealImg,
          origin: originMeal,
        },
      ];
    } else {
      indexItem = orderSpecsCurrent.findIndex((item) => item.meal === mealID);

      if (indexItem !== -1) {
        let orderItem = orderSpecsCurrent[indexItem];

        const begin = orderSpecsCurrent.slice(0, indexItem);
        const end = orderSpecsCurrent.slice(
          indexItem + 1,
          orderSpecsCurrent.length
        );
        orderSpecsCurrent[indexItem] = {
          ...orderItem,
          quantity: orderItem.quantity + 1,
        };

        orderItems = [...begin, orderSpecsCurrent[indexItem], ...end];
      } else {
        qty += 1;

        orderItems = [
          ...orderSpecsCurrent,
          {
            id: mealID,
            name: mealName,
            quantity: qty,
            price: mealPrice,
            image: mealImg,
            origin: originMeal,
          },
        ];
      }
    }

    console.log("orderItems:", orderItems);

    setTimeout(() => {
      handleOrderSpecs(orderItems);
      getUpdatingTemplateDay(orderItems);
    }, 3000);
  };

  const confirmOrder = () => {
    setTimeout(() => {
      console.log("updating...");
      buildOrderItem();
    }, 3000);

    setTimeout(() => {
      setIsCliked(false);
      handleNewLocation(false);
      console.log("order Confirmed!");
      console.log("orderSpecsCurrent catch :", orderSpecsCurrent);
    }, 3200);
  };

  return (
    <button type="button" className="  btn_con_order" onClick={confirmOrder}>
      Confirm
    </button>
  );
};

export const Reject = ({ setIsCliked }) => {
  /* const orderSpecsCurrent = useSelector(orderSpecsCurrent_section); */

  const {
    state: { orderSpecsCurrent },
  } = useContext(TemplateContext);

  const rejectOrder = () => {
    setTimeout(() => {
      console.log("updating reject...");
    }, 2000);

    setTimeout(async () => {
      console.log("order Rejected!");
      setIsCliked(false);
      console.log("orderSpecsCurrent after reject :", orderSpecsCurrent);
    }, 1800);
  };

  return (
    <button type="button" className="  btn_rej_order" onClick={rejectOrder}>
      Reject
    </button>
  );
};

export const TimeAwait = ({ setWaiting }) => {
  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
    }, 2200);
  }, []);
  return (
    <button type="button" className="btn btn_ordered">
      loading...
    </button>
  );
};

function Button({ mealid, mealname, mealprice, mealimg, originmeal }) {
  const { handleOpenFinalValidation } = useContext(ValidationContext);

  const [isClicked, setIsCliked] = useState(false);

  const upstreamOrder = (e) => {
    console.log(e.target);
    /*  handleOpenFinalValidation(false); */
    /* setIsCliked(true); */

    setTimeout(async () => {
      await setIsCliked(true);
      console.log(" isClicked set true");
    }, 1000);
  };

  return (
    <>
      {!isClicked ? (
        <div className="btn_wrap_order">
          <button
            type="button"
            className=" btn btn_order"
            onClick={(e) => upstreamOrder(e)}
          >
            Order
          </button>
        </div>
      ) : (
        <Ordered
          mealid={mealid}
          mealname={mealname}
          mealprice={mealprice}
          mealimg={mealimg}
          originmeal={originmeal}
          isClicked={isClicked}
          setIsCliked={setIsCliked}
        />
      )}
    </>
  );
}

export default Button;
