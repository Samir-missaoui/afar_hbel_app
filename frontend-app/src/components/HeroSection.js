import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection(props) {
  return (
    <div className="hero-container">
      <video src={props.video} autoPlay loop muted />
      <h1>{props.text}</h1>
      <p>{props.text2}</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          {props.button}
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
