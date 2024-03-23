import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import styled from "styled-components";
import { MealContext } from "../../services/context/MealsContext";
import { TemplateContext } from "../../services/context/TemplateContext";
import { ValidationContext } from "../../services/context/ValidationContext";
import { endPayment } from "../../callAPI/PaymentApi";
import ErrorWarning from "./styledComponents/MsgError";

import { MTN, ORANGE } from "../../assets/images";
import { devices } from "./styledComponents/devices";

const PaymentProcess = styled.div`
  position: absolute;
  top: -1rem;
  left: 0;
  transform: translate(-50%, -100%);
  width: calc(50vw);
  height: 30rem;
  padding: 0.5rem;
  margin: 0 auto;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*   align-items: center; */
  gap: 0.5rem;

  @media ${devices.mobileXtraMini} {
    left: -33px;
    width: calc(74vw);
    font-size: clamp(0.65rem, 0.75rem, 0, 95rem);
    height: 34rem;
  }

  @media ${devices.mobileMiniS} {
    width: calc(50vw);
    font-size: clamp(0.75rem, 0.89rem, 1, 1rem);
    height: 34rem;
  }
  @media ${devices.tablet} {
    left: 50%;
    width: 100%;
    height: 30rem;
  }
`;

const TitleProPay = styled.h4`
  width: 100%;
  padding: 0.5rem 0;
  font-size: clamp(0.74rem, 0.95rem, 1.15rem);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PaymentControl = styled.form`
  width: 100%;
  height: auto;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const ControlPaymentPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

const Label = styled.label`
  @media ${devices.mobileXtraMini} {
    font-size: clamp(0.5rem, 0.85rem, 1rem);
  }
  @media ${devices.tablet} {
    left: 50%;
    width: 100%;
    font-size: clamp(0.75rem, 1rem, 1.2rem);
  }
`;

const InputPanelPayment = styled.input`
  width: 100%;
  height: 36px;
  color: #fff;
  background-color: #6c8665d5;
  font-size: clamp(0.85rem, 0.95rem, 1rem);
  text-indent: 5%;

  @media ${devices.mobileXtraMini} {
    height: 28px;
  }

  @media ${devices.tablet} {
    height: 36px;
  }
`;

const BrandOverView = styled.ul`
  width: 100%;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-template-rows: min-content;
  place-items: center;

  @media ${devices.mobileXtraMini} {
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: 0.25rem;
  }

  @media ${devices.mobileMiniL} {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;

const Brand = styled.li`
    width: 100%;
    height:100%;
    padding:0.25rem;
    display: flex;
    flex-direction:column
    justify-content: center;
    gap:0.25rem;
  `;

const Span = styled.span`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BrandLogo = styled.i`
  width: 100%;
  heigth: 100%;
  object-fit: cover;
  @media ${devices.mobileMiniS} {
    width: 74%;
  }

  @media ${devices.tablet} {
    width: 100%;
  }
`;

const BrandLogoImG = styled.img`
  width: 100%;
  heigth: 100%;
  object-fit: cover;

  @media ${devices.mobileMiniS} {
    width: 74%;
  }

  @media ${devices.tablet} {
    width: 100%;
  }
`;

const BrandName = styled.p`
  font-size: clamp(0, 84rem, 1rem, 1, 15rem);
`;

const Select = styled.select`
  width: 100%;
  height: 36px;
  color: #fff;
  background-color: #ded4;
  text-align: center;
`;

const OptionPanelPayment = styled.option`
    width: 100%;
    height: 100%
    padding: 0.25rem 0;
    font-size: clamp(0.89rem, 1.15rem, 1.3rem);   
  `;

const ValidatePayment = styled.ul`
  width: 100%;
  height: auto;
  margin: 0.5rem auto;
`;

const ProcessGuideOne = styled.li`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-content: flex-start;
`;

const ProcessGuideTwo = styled(ProcessGuideOne)`
  justify-content: flex-end;
`;

const ButtonBack = styled.button`
  width: 5rem;
  heigth: 4rem;
  color: #fff;
  background-color: #222;
  border: 2px solid #ddd;
  text-align: center;
  @media ${devices.mobileXtraMini} {
    width: 5rem;
    heigth: 4rem;
    font-size: clamp(0.45rem, 0.55rem, 0.75rem);
  }

  @media ${devices.mobileMiniL} {
    width: 5rem;
    heigth: 4rem;
    font-size: clamp(0.75rem, 0.85rem, 1rem);
  }
`;

const ButtonSend = styled(ButtonBack)`
  background-color: #152b44;
  background-color: #ac2144;
  border: 2px solid #1c7e4d;
`;

/* function PaymentSubmit({ id }) {
 
  return (
    <div className="payment_process">
      <h4 className="title_process_payment">Payment</h4>
      <form className="payment_control">
        <div className="control_payment_panel">
          <label htmlFor="code">code Payment</label>
          <input
            type="text"
            name="code"
            id="code"
            className="input_panel_payment"
          />
        </div>
        <div className="control_payment_panel">
          <label htmlFor="account">account</label>
          <ul className="brand_overview">
            <li className="brand">
              <span>
                <i className="fa-brands fa-cc-paypal"></i>
              </span>
              <p className="brand_name">PayPal</p>
            </li>
            <li className="brand">
              <span>
                <img src={MTN} className="img_payment" alt="missing payment" />
              </span>
              <p className="brand_name">MTN</p>
            </li>
            <li className="brand">
              <span>
                <img
                  src={ORANGE}
                  className="img_payment"
                  alt="missing payment"
                />
              </span>
              <p className="brand_name">ORANGE</p>
            </li>
          </ul>

          <select name="account" id="account" className="account_transaction">
            <option className="option_panel_payment" value="paypal">
              paypal
            </option>
            <option className="option_panel_payment" value="mtn">
              mtn
            </option>
            <option className="option_panel_payment" value="orange">
              orange
            </option>
          </select>
        </div>
        <div className="control_payment_panel">
          <label htmlFor="amount">amount withdraw</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="input_panel_payment"
          />
        </div>
        <ul className="validate_payment">
          <li className="process_guide">
            <button type="submit" className="payment_load">
              Back
            </button>
          </li>
          <li className="process_guide">
            <button type="submit" className="payment_load">
              Send
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
} */

function PaymentSubmit({ id, delayPayment, setIsPayment, setIsPaid }) {
  const {
    state: { ordersWeek, ordersDay },
    handleOrdersWeek,
    handleOrdersDay,
  } = useContext(MealContext);

  const {
    state: { payments, dataTemplatesOrdersDay },
    handlePayment,
    handleTemplateOrdersDay,
  } = useContext(TemplateContext);

  const {
    state: {
      isError,
      timerIn,
      componentSectionName,
      forseen,
      countClickValidate,
    },
    handleIsError,
    handleMessageError,
    handleForSeen,
    handleSectionName,
    handleIsEndWatchingTimer,
    handleTimerIn,
  } = useContext(ValidationContext);

  const [availableForPayment, setAvailableForPayment] = useState(payments[+id]);

  const updateOrdersWeekAndDay = useCallback(async () => {
    //  Updating Orders List Week!

    // new logic
    const dayMeals = dataTemplatesOrdersDay[id].orderSpecsCurrent;

    console.log("dayMeals:", dayMeals);
    const dayMealsObj = { ...ordersDay, ...dayMeals };
    const indexDay = moment().format("d");
    const weekMealsObj = {
      ...ordersWeek,
      [indexDay]: { ...ordersWeek[indexDay], ...dayMeals },
    };

    console.log("dayMealsObj:", dayMealsObj);
    console.log("weakMealsObj:", weekMealsObj);

    handleOrdersDay(dayMealsObj);
    handleOrdersWeek(weekMealsObj);
  }, []);

  const proccessingPayment = useCallback(async (idTmp, dataPayment) => {
    return await new Promise(async (resolve) => {
      let { paymentId, account, amountBill } = dataPayment;

      console.log("idTmp : ==> : ", idTmp);

      const paymentOnTheEnd = async () => {
        const newSend = await endPayment(paymentId, account, amountBill);
        return newSend;
      };

      const toSend = await paymentOnTheEnd(); // wasn't properly resolved ==> test once again

      console.log("payments:", payments);

      const indexPay = idTmp;

      let newUpdatedPayment = { ...payments, [indexPay]: toSend };

      console.log("new update payment:", newUpdatedPayment); // something fishy here affecting dataTemplatesOrdersDay

      handlePayment(newUpdatedPayment);

      let newData;

      newData = {
        ...dataTemplatesOrdersDay,
        [indexPay]: {
          ...dataTemplatesOrdersDay[+indexPay],
          payments: newUpdatedPayment,
        },
      };

      console.log("new dataTemplatesOrdersDay:", newData);

      handleTemplateOrdersDay(newData);

      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }, []);

  const endingStepPayment = (e, id) => {
    e.preventDefault();
    console.log(e.target);
    console.log("willing to end the payment");

    const inputCode = e.target.elements.code;
    const selectCompany = e.target.elements.company;
    const inputAmount = e.target.elements.amount;
    const dataCheckOrder = dataTemplatesOrdersDay[+id];
    let newHoldingPaymentData;

    if (inputCode.value === "" || inputAmount.value === "") {
      handleSectionName("paymentEnd");
      handleForSeen(true);
      handleMessageError(
        "One or two Field Missing. Please Check and Complete."
      );
      handleIsError(true);
      setTimeout(() => {
        handleIsError(false);
      }, 7500);

      return;
    }

    if (
      inputCode.value !== dataCheckOrder.thisOrder.codePayment ||
      inputAmount.value !== dataCheckOrder.totalPrice
    ) {
      handleSectionName("paymentEnd");
      handleForSeen(true);
      handleMessageError(
        "One or two Field Missing. Please Check and Complete."
      );
      handleIsError(true);
      setTimeout(() => {
        handleIsError(false);
      }, 7500);

      return;
    }

    handleIsEndWatchingTimer(false);

    newHoldingPaymentData = {
      paymentId: availableForPayment._id,
      account: selectCompany.value,
      amountBill: inputAmount.value,
    };

    proccessingPayment(id, newHoldingPaymentData);
    updateOrdersWeekAndDay();

    console.log("timerIn ==> Payment Submit:", timerIn);

    setIsPaid(true);

    setIsPayment(false);
  };

  useEffect(() => {
    console.log("seems to be having an error...");
  }, [isError]);

  return (
    <>
      <PaymentProcess>
        <TitleProPay>Payment</TitleProPay>
        {isError && <ErrorWarning />}
        <PaymentControl onSubmit={(e) => endingStepPayment(e, id)}>
          <ControlPaymentPanel>
            <Label htmlFor="code">code Payment</Label>
            <InputPanelPayment type="text" name="code" id="code" />
          </ControlPaymentPanel>
          <ControlPaymentPanel>
            <Label htmlFor="account">account </Label>
            <BrandOverView>
              <Brand>
                <Span>
                  <BrandLogo className="fa-brands fa-cc-paypal"></BrandLogo>
                </Span>
                <BrandName>PayPal</BrandName>
              </Brand>
              <Brand>
                <Span>
                  <BrandLogoImG
                    src={MTN}
                    className="img_payment"
                    alt="missing payment"
                  />
                </Span>
                <BrandName>MTN</BrandName>
              </Brand>
              <Brand>
                <Span>
                  <BrandLogoImG
                    src={ORANGE}
                    className="img_payment"
                    alt="missing payment"
                  />
                </Span>
                <BrandName>ORANGE</BrandName>
              </Brand>
            </BrandOverView>
            <Select id="company" name="company">
              <OptionPanelPayment value="paypal">paypal</OptionPanelPayment>
              <OptionPanelPayment value="mtn">mtn</OptionPanelPayment>
              <OptionPanelPayment value="orange">orange</OptionPanelPayment>
            </Select>
          </ControlPaymentPanel>
          <ControlPaymentPanel>
            <Label htmlFor="amount">amount withdraw</Label>
            <InputPanelPayment type="text" id="amount" name="amount" />
          </ControlPaymentPanel>
          <ValidatePayment>
            <ProcessGuideOne>
              <ButtonBack onClick={delayPayment}>Back</ButtonBack>
            </ProcessGuideOne>
            <ProcessGuideTwo>
              <ButtonSend type="submit">Send</ButtonSend>
            </ProcessGuideTwo>
          </ValidatePayment>
        </PaymentControl>
      </PaymentProcess>
    </>
  );
}

export default PaymentSubmit;
