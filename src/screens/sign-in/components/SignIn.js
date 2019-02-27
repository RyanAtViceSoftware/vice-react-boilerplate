import React from "react";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import { FORM_NAME } from "../signIn.constants";
import "./SignIn.css";

const SignIn = props => {
  const { handleSubmit, pristine, submitting, isAuthenticated, from } = props;
  return (
    <form onSubmit={handleSubmit}>
      {isAuthenticated ? (
        <Redirect to={from} />
      ) : (
        <div className="row" id="wrapper">
          <div className="col-md-6 iconCol">
            <div className="imgContainer">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/914629/logo.icon.final.white.png" />
            </div>
          </div>
          <div className="col-md-6 col-12 formCol">
            <div className="formContainer">
              <div className="smallLogoContainer">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/914629/logo.final.png"
                  id="smallLogo"
                  width="300px"
                />

                <h6 className="welcomeText">
                  Welcome back! Please login to your account.
                </h6>
              </div>

              <div className="inputContainer">
                <span className="label">Email</span>
                <Field
                  id="userNameTextBox"
                  className="form-control"
                  name="userName"
                  component="input"
                  type="text"
                  placeholder="User Name"
                />
              </div>

              <div className="inputContainer">
                <span className="label">Password</span>
                <Field
                  id="passwordTextBox"
                  className="form-control"
                  name="password"
                  component="input"
                  type="password"
                />
              </div>

              <div className="registrationContainer">
                <div className="row section">
                  <div className="col-6">
                    <input type="checkbox" />{" "}
                    <span id="rememberMe">Remember me</span>
                  </div>

                  <div className="col-6 passwordLinkCtn">
                    <span id="forgotPassword">Forgot Password</span>
                  </div>
                </div>

                <div id="signUpBtnCtn" className="row section">
                  <div className="col-6">
                    <button id="signIn">Sign in</button>
                  </div>

                  <div className="col-6 signUpCtn">
                    <button
                      id="signUp"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>

              <div id="footerLinks">
                <a href="#">Terms & Conditions</a>
                <a href="#">Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default reduxForm({
  form: FORM_NAME // a unique identifier for this form
})(SignIn);
