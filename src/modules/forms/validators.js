export const required = value => {
  return (!isNaN(value) && +value) || (isNaN(value) && value !== undefined)
    ? undefined
    : "Required";
};
