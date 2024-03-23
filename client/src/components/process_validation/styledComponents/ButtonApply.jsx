import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { TemplateContext } from "../../../services/context/TemplateContext";
import { ValidationContext } from "../../../services/context/ValidationContext";
import { devices } from "./devices";

const ButtonA = styled.button`
  padding: 0.25em 1em;
  /*  font-size: clamp(0.7rem, 1.25rem, 1.3rem); */
  border: 2px solid #fff;
  border-radius: 5px;
  color: ${(props) => (props.$primary === "green" ? "#000" : "#555")};
  background-color: ${(props) =>
    props.$primary === "green" ? "#1c7e4d" : "#ddd"};
  @media ${devices.mobileXtraMini} {
    width: 90%;
    top: 0.15rem;
    padding: 0.15em 0.5em;
    font-size: 0.8em;
    margin: 0 auto;
  }
  @media ${devices.mobileMiniS} {
    width: 100%;
    font-size: clamp(0.65rem, 1.1em, 1.5em);
  }
  @media ${devices.tablet} {
    width: 70%;
  }
`;

const ButtonB = styled.button.attrs(() => ({}))`
  position: relative;
  top: 0rem;
  right: 2rem;
  padding: 0.25em 1em;
  margin: 1rem;
  color: #fff;
  background-color: #636262;
  /* background-color: #111; */
  font-size: clamp(0.5rem, 0.84rem, 1rem);
  display: block;
  float: right;
  border-radius: 15px;
  border: 2px solid #555353;
  transition: all 1s ease-in-out;

  &:hover {
    color: #f5f5e5;
    background-color: #333;
    border: 2px solid #fff;
    animation: minimizeText 700ms ease-in-out 1s forwards;
  }

  @media ${devices.mobileXtraMini} {
    width: 90%;
    top: 0.15rem;
    padding: 0.15em 0.5em;
    font-size: 0.8em;
    margin: 0 auto;
  }
  @media ${devices.mobileMiniS} {
    width: 100%;
    font-size: clamp(0.65rem, 1.1em, 1.5em);
  }
  @media ${devices.tablet} {
    width: 70%;
  }
`;

export const ButtonApplyTest = ({ bgColor, onClick }) => {
  const {
    state: { applyText },
  } = useContext(ValidationContext);

  if (applyText === "Apply") return <ButtonA $primary={bgColor}>Apply</ButtonA>;

  if (applyText === "Minimize")
    return <ButtonB onClick={onClick}>minimize</ButtonB>;
};

function ButtonApply({ id, onClick }) {
  const {
    state: { applyText, boardTemplateText },
  } = useContext(ValidationContext);

  if (boardTemplateText[+id] === "Apply")
    return <ButtonA $primary="green">Apply</ButtonA>;

  if (boardTemplateText[+id] === "Minimize")
    return <ButtonB onClick={onClick}>minimize</ButtonB>;
}

/* function ButtonApply() {
  return (
    <button
      type="button"
      className="btn_apply_order"
      onClick={openToNewLocation}
      ref={minimizeOrApplyRef}
    >
      Apply
    </button>
  );
} */

export default ButtonApply;
