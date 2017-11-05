import _ from 'lodash';
import { FORM_NAME } from './sign-in.constants';

export const getSignInFormValues = state =>
  _.get(state, `${FORM_NAME}.values`, {});
