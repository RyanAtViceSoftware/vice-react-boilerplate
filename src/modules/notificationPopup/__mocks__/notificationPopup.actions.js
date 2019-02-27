import { failTest } from "../../../test/common.utils";
import { NOTIFY_SUCCESS, RESET } from "../notificationPopup.actionTypes";

export const handleError = (
  type,
  { errorMessage, message, stack, componentStack }
) => {
  failTest(
    `handleError was called! 
      type: ${type}
      errorMessage: ${errorMessage}
      message: ${message}
      stack: ${stack}
      componentStack: ${componentStack}`
  );
};

export const notifySuccess = (successMessage, { title, config } = {}) => {
  return {
    type: NOTIFY_SUCCESS,
    payload: {
      successMessage,
      config: {
        ...config,
        title
      }
    }
  };
};

export const resetError = () => ({
  type: RESET
});
