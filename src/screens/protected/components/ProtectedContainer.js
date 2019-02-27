import React from "react";
import userContext from "../../../modules/userContext";

const { WithRestrictedAccess } = userContext.components;

const ProtectedContainer = () => <h1>Protected Page</h1>;

export default WithRestrictedAccess(ProtectedContainer, ["can-do-anything"]);
