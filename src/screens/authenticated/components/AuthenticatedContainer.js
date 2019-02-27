import React from "react";
import userContext from "../../../modules/userContext";

const { WithRestrictedAccess } = userContext.components;

const ProtectedContainer = () => (
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
        </div>

        <div className="inputContainer">
          <div className="row">
            <div className="col-6">
              <span className="label">First Name</span>
              <input type="text" className="form-control" />
            </div>

            <div className="col-6">
              <span className="label">Last Name</span>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className="inputContainer">
          <span className="label">Email</span>
          <input type="text" className="form-control" />
        </div>

        <div className="inputContainer">
          <span className="label">Phone Number (optional)</span>
          <input type="text" className="form-control" />
        </div>

        <div className="inputContainer">
          <span className="label">User ID:</span>
          <input type="text" className="form-control" />
        </div>

        <div className="inputContainer">
          <span className="label">Create a 5-digit PIN:</span>
          <input type="text" className="form-control" />
        </div>

        <div className="inputContainer">
          <span className="label">Retype PIN:</span>
          <input type="text" className="form-control" />
        </div>

        <div className="registrationContainer">
          <p>
            <span className="info">
              By creating a new account with INSTANT 2290, you are agreeing to
              i2290.com's <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </p>
          <p>
            <button id="signUpBtn">Sign Up</button>
          </p>

          <p className="signUpLinkCtn">
            <span className="info">
              Already have an account? <a href="#">Sign in.</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WithRestrictedAccess(ProtectedContainer);
