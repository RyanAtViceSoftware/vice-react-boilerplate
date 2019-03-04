import { ADD, DELETE } from "./httpCache.actionTypes";

export const addRequestToCache = ({ url, httpMethod, config } = {}) => ({
  type: ADD,
  payload: {
    url,
    httpMethod,
    config,
    createdAt: Date.now()
  }
});

export const deleteRequestFromCache = ({ url, httpMethod, patterns }) => {
  const hasUrlAndHttpMethod = url && httpMethod;
  if (!(hasUrlAndHttpMethod || patterns)) {
    throw new Error(
      "You must provide either a url and httpMethod or an array of patterns to search by."
    );
  }
  return {
    type: DELETE,
    payload: {
      url,
      httpMethod,
      patterns
    }
  };
};
