import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

const MenuItem = withRouter(({ to, children, location }) => (
  <li className={classNames({ active: to === location.pathname })}>
    <Link to={to}>{children}</Link>
  </li>
));

export default MenuItem;
