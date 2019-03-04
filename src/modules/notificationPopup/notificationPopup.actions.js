import { NOTIFY_SUCCESS, RESET, CLOSE } from "./notificationPopup.actionTypes";

// We are using let so that we can assign fakes in tests. Might be a better way to do this :P
export const handleError = (
  type,
  { errorMessage, message, stack, componentStack }
) => {
  if (!type) {
    throw new Error(
      "You must specify a type argument which is a redux action type to be used with your error"
    );
  }

  console.log(`${errorMessage}:${message}:${stack}
      ${componentStack ? "componentStack: " + componentStack : ""}
      `);

  return {
    type,
    payload: {
      errorMessage,
      message,
      stack
    }
  };
};

export const notifySuccess = (successMessage, { title, config } = {}) => ({
  type: NOTIFY_SUCCESS,
  payload: {
    successMessage,
    config: {
      ...config,
      title
    }
  }
});

export const resetError = () => ({
  type: RESET
});

export const closePopup = () => ({
  type: CLOSE
});
