import React from "react";
import "./navBar.css";

const NavBar = ({ children }) => (
  <header>
    <ul>{children}</ul>
  </header>
);

export default NavBar;
