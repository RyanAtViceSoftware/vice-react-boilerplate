import * as types from "./httpCache.actionTypes";
import { getCacheKey } from "./httpCache.common";

const intialState = {};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case types.ADD: {
      const newState = {
        ...state
      };

      newState[getCacheKey(action.payload)] = {
        ...action.payload.config,
        createdAt: action.payload.createdAt
      };

      return newState;
    }

    case types.RESET: {
      return intialState;
    }

    case types.DELETE: {
      const newState = {
        ...state
      };

      if (
        action.payload.url &&
        action.payload.httpMethod &&
        !action.payload.patterns
      ) {
        delete newState[getCacheKey(action.payload)];
      } else if (
        !(action.payload.url && action.payload.httpMethod) &&
        action.payload.patterns
      ) {
        for (const cacheKey in newState) {
          if (
            newState.hasOwnProperty(cacheKey) &&
            action.payload.patterns.some(p => p.test(cacheKey))
          ) {
            delete newState[cacheKey];
          }
        }
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}
