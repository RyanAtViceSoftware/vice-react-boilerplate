import _ from "lodash";
import { FORM_NAME } from "./signIn.constants";

export const getSignInFormValues = state =>
  _.get(state, `${FORM_NAME}.values`, {});
