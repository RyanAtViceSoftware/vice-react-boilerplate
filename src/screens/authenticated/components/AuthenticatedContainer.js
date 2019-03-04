import React from "react";
import userContext from "../../../modules/userContext";

const { WithRestrictedAccess } = userContext.components;

const ProtectedContainer = () => <h1>Authenticated Page</h1>;

export default WithRestrictedAccess(ProtectedContainer);
