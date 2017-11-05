import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { FORM_NAME } from '../sign-in.constants';

const SignIn = props => {
  const { handleSubmit, pristine, submitting, isAuthenticated, from } = props;
  return (
    <form onSubmit={handleSubmit}>
      {isAuthenticated ? (
        <Redirect to={from} />
      ) : (
        <div>
          <div>
            <label>User Name</label>
            <div>
              <Field
                name="userName"
                component="input"
                type="text"
                placeholder="User Name"
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <Field name="password" component="input" type="password" />
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default reduxForm({
  form: FORM_NAME // a unique identifier for this form
})(SignIn);
