import React from "react";
import Indicator from "./indicator.svg";
import "./busyIndicator.css";

const BusyIndicator = () => (
  <img className="loader" src={Indicator} alt="Busy indicator" />
);

export default BusyIndicator;
