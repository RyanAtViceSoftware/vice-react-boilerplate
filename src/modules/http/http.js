import fetch from "cross-fetch";
import localStorage from "localStorage";
import { API_URL } from "./http.constants";
// import { getJwtToken } from "../../modules/userContext/userContext.selectors";
// import { getState } from "../store";
// import * as actionTypes from "../userContext/userContext.actionTypes";

export default {
  get,
  post,
  put,
  patch,
  delete: callDelete
};

const ASYNC_DELAY = 1000;

function get(url, config, { stubSuccess, stubError } = {}) {
  return doFetch(url, config, { stubSuccess, stubError });
}

function post(url, config, { stubSuccess, stubError } = {}) {
  config = {
    ...config,
    method: "POST"
  };

  return doFetch(url, config, { stubSuccess, stubError });
}

function put(url, config, { stubSuccess, stubError } = {}) {
  config = {
    ...config,
    method: "PUT"
  };

  return doFetch(url, config, { stubSuccess, stubError });
}

function patch(url, config, { stubSuccess, stubError } = {}) {
  config = {
    ...config,
    method: "PATCH"
  };

  return doFetch(url, config, { stubSuccess, stubError });
}

function callDelete(url, config, { stubSuccess, stubError } = {}) {
  config = {
    ...config,
    method: "DELETE"
  };

  return doFetch(url, config, { stubSuccess, stubError });
}

// If stubSuccess or stubError is defined then we will fake a successful call to the
// server and return stubSuccess as the response. This allows for easily
// faking calls during development when APIs aren't ready. A warning
// will be written out for each stubbed response to help prevent forgetting
// about the stubs.
function doFetch(url, config, { stubSuccess, stubError } = {}) {
  if (!url) {
    throw new Error("You must specify a url");
  }

  if (process.env.NODE_ENV !== "test") {
    if (stubSuccess) {
      return new Promise(resolve =>
        setTimeout(() => {
          console.warn(`Stubbed service call made to url: ${url}`);
          resolve(stubSuccess);
        }, ASYNC_DELAY)
      );
    }

    if (stubError) {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          console.warn(`Stubbed service error was returned from url: ${url}`);
          reject(stubError);
        }, ASYNC_DELAY)
      );
    }
  }
  return fetch(buildUrl(url), addJwtToken(config)).then(response => {
    if (response.headers) {
      const authHeader = response.headers.get("Authorization");

      setJwtTokenFromHeaderResponse(authHeader);
      // updateSessionToken(parseJwtTokenFromHeader(authHeader));
    }

    if (response.ok) {
      if (response.headers.map["content-type"].includes("stream")) {
        return response;
      }
      return response.json();
    }

    const unauthorized = 401;
    if (response.status === unauthorized) {
      // All else failed so redirect user ot FMS to reauthenticate
      localStorage.removeItem("jwtToken");
      // response.json().then(() => redirectToSignOut());
    }

    return response.json().then(r => Promise.reject(r));
  });
}

function buildUrl(url) {
  return `${API_URL}/${url}`;
}

function addJwtToken(config) {
  // TODO: Implement me
  // const jwtToken = getJwtToken(getState());
  // if (!jwtToken || !config) {
  //   return config;
  // }
  //
  // const authorization = `Bearer ${jwtToken}`;
  // return {
  //   ...config,
  //   headers: {
  //     ...config.headers,
  //     Authorization: authorization
  //   }
  // };
  return config;
}

function setJwtTokenFromHeaderResponse(authorizationHeader) {
  const jwtToken = parseJwtTokenFromHeader(authorizationHeader);
  if (jwtToken) {
    localStorage.setItem("jwtToken", jwtToken);
  } else {
    localStorage.removeItem("jwtToken");
  }
}

function parseJwtTokenFromHeader(authorizationHeader) {
  if (!authorizationHeader) {
    return;
  }
  const tokens = authorizationHeader.match(/\S+/g);

  // We are getting the second token because the first token will be Bearer.
  // EX: Bearer woeirweoirjw....
  return tokens.length > 1 ? tokens[1] : null;
}

// const updateSessionToken = token => dispatch => {
// TODO: Do we need this?
// dispatch({
//   type: actionTypes.JWT_TOKEN_ASYNC.RECEIVED,
//   payload: token
// });
// };
