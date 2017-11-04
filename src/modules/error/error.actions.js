import * as actionTypes from './error.actionTypes'

export const handleError = (type, { errorMessage, message, stack }) => ({
    type,
    payload: {
      errorMessage,
      message,
      stack
    },
  }
);

export const resetError = () => ({
  type: actionTypes.RESET,
});
