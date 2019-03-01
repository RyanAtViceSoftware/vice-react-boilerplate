import { constants } from "../http";
import * as actionTypes from "./userContext.actionTypes";
import doAsync from "../doAsync";

const { NOT_FOUND, BAD_REQUEST } = constants;

export const signIn = (email, password) => {
  const { stubSuccess, stubError } = fakeAuthentication(email, password);

  return doAsync({
    actionType: actionTypes.LOGIN_ASYNC,
    url: "api/v1/login", // TODO: Let's move the base url to doAsync
    httpConfig: {
      body: JSON.stringify({ email, password })
    },
    stubSuccess,
    stubError,
    mapResponseToPayload: r => r,
    errorMessage: `Unable to retrieve log in user. Error: ${stubError &&
      stubError.statuscode}`
  });
};

export const updateUserContext = user => ({
  type: actionTypes.UPDATE_USER_CONTEXT,
  payload: user
});

// Will create a request with either
// (1) stubSuccess property to fake a successful server authentication
// (2) stubError property to fake a server authentication error
function fakeAuthentication(email, password) {
  const response = {};

  let stubError;
  let permissions = [];
  let displayName;
  let username;

  if (email === "bak@clear-launch.com") {
    displayName = "Bak Zoumanigui";
    username = "BakZoumanigui";
    permissions = ["can-do-anything"];
  } else if (email === "orion@clear-launch") {
    displayName = "Orion Jensen";
    username = "OrionJensen";
  } else if (email === "Phil.boyer@i2290.com") {
    displayName = "Phil Boyer";
    username = "PhilBoyer";
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
      email,
      displayName,
      permissions,
      username
    };
  }

  return response;
}
