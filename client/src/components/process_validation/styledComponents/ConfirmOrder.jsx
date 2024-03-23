import react, { useState } from "react";
import styled from "styled-components";
import { devices } from "./devices";

// styled-components
const ValidateMsg = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  width: 80%;
  padding: 0.5rem;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 3;
  @media ${devices.mobileMiniL} {
    bottom: 20px;
    width: 50%;
  }
  @media ${devices.tablet} {
    width: 40%;
  }
`;

const ValidateMsgContent = styled.div`
position:relative;
width:100%
height:100%;
padding: 0.25rem;
background-color: #1c7e4d;
 border-radius:5px;
 font-size: clamp(0.6rem, 0.7rem, 1rem);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const Validation = styled.p`
  font-weight: bolder;
  font-size: clamp(0.7rem, 0.82rem, 1rem);
  text-align: center;
`;
const BtnValidation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#1c7e4d" : "#d4cfcf")};
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: ${(props) => (props.$primary ? "2px solid #fff" : "2px solid gray")};
  font-size: clamp(0.55rem, 0.65rem, 0.85rem);
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

/* function ValidateOrder() {
  
  return (
    <div className="wrap_validate_msg">
      <div className="validate_msg_content">
        <p className="msg_validation">Do You Confirm The Order</p>
        <div className="space_btn_validation">
          <button type="button" className="accept_validation">
            YES
          </button>
          <button type="button" className="close_validation">
            NO
          </button>
        </div>
      </div>
    </div>
  );
} */

function ConfirmOrder({ handleStepBackLoc, validateThisOrder }) {
  return (
    <ValidateMsg>
      <ValidateMsgContent>
        <Validation>Do You Confirm The Order .</Validation>
        <BtnValidation>
          <Button $primary onClick={() => validateThisOrder()}>
            YES
          </Button>
          <Button
            onClick={(space) => handleStepBackLoc((space = "toTemplate"))}
          >
            NO
          </Button>
        </BtnValidation>
      </ValidateMsgContent>
    </ValidateMsg>
  );
}

export default ConfirmOrder;
