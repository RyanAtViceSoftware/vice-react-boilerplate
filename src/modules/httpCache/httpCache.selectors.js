import isEqual from "lodash/isEqual";
import { CACHE_TIMEOUT, STATE_NAME } from "./httpCache.constants";
import { getCacheKey } from "./httpCache.common";

const isExpired = item => {
  const currentTime = Date.now();
  return currentTime - item.createdAt > CACHE_TIMEOUT;
};

const getRequestCache = state => state[STATE_NAME];

export const tryToFindRequestInCache = (state, url, httpMethod, body) => {
  const cacheKey = getCacheKey({ url, httpMethod });
  const item = getRequestCache(state)[cacheKey];

  if (
    item &&
    ((httpMethod.toLowerCase() === "post" ||
      httpMethod.toLowerCase() === "put") &&
      body)
  ) {
    if (!isEqual(item.body, body)) {
      return false;
    }
  }

  if (!item) {
    return item;
  }

  if (isExpired(item)) {
    // TODO: ryan - remove this as it's now mutating state
    // getRequestCache[cacheKey] = undefined;
    return false;
  }

  return item;
};
