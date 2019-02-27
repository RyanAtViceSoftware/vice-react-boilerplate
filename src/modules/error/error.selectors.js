import _ from "lodash";

export const getErrorMessage = state => _.get(state, "error.errorMessage");
