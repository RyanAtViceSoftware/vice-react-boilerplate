export const handleError = (type, { message, stack }) => ({
    type,
    payload: {
      message,
      stack
    }
  }
);
