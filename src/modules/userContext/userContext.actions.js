import http, { constants } from "../http";
import * as actionTypes from "./userContext.actionTypes";
import error from "../error";

const {
  actions: { handleError }
} = error;
const { NOT_FOUND, BAD_REQUEST } = constants;

export const signIn = (userName, password) => async dispatch => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUESTED });

    const url = "user-context";

    const body = { userName, password };

    const fakeServerResponse = fakeAuthentication(userName, password);

    const response = await http.get(url, body, fakeServerResponse);

    dispatch({ type: actionTypes.LOGIN_RECEIVED, payload: response.body });
  } catch (error) {
    let errorMessage;

    if (error.statusCode === NOT_FOUND) {
      errorMessage = "User name not found.";
    } else if (error.statusCode) {
      errorMessage = "Invalid password.";
    } else {
      errorMessage = "An unknown error occurred";
    }

    dispatch(handleError(actionTypes.LOGIN_ERROR, { errorMessage }));
  }
};

// Will create a request with either
// (1) stubSuccess property to fake a successful server authentication
// (2) stubError property to fake a server authentication error
function fakeAuthentication(userName, password) {
  const response = {};

  let stubError;
  let permissions = [];
  let displayName;

  if (userName === "ryan@vicesoftware.com") {
    displayName = "Ryan Vice";
    permissions = ["can-do-anything"];
  } else if (userName === "heather@vicesoftware.com") {
    displayName = "Heather Vice";
  } else {
    stubError = {
      statusCode: NOT_FOUND
    };
  }

  if (password !== "password") {
    stubError = {
      statusCode: BAD_REQUEST
    };
  }

  if (stubError) {
    response.stubError = stubError;
  } else {
    response.stubSuccess = {
      userName,
      displayName,
      permissions
    };
  }

  return response;
}
