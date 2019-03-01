import { Field, reduxForm } from "redux-form";
import React from "react";
import { FORM_NAME } from "../account.constants";

const Account = () => (
  <form>
    <div className="d-flex" id="wrapper">
      <div className="bg-light" id="sidebar-wrapper">
        <div className="sidebar-heading" id="logoContainer">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/914629/logo.icon.final.white.png"
            id="logoImg"
          />
        </div>
        <div className="list-group list-group-flush">
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
          >
            <i className="fa fa-2x fa-bars" />
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
          >
            <i className="fa fa-2x fa-tachometer" />
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
          >
            <i className="fa fa-2x fa-dollar" />
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action item-active"
          >
            <i className="fa fa-2x fa-user" />
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-light"
          >
            <i className="fa fa-2x fa-question" />
          </a>
        </div>
      </div>

      <div id="page-content-wrapper">
        <nav
          id="mainNavbar"
          className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom"
        >
          <ul className="navbar-nav">
            <li>
              <a className="nav-link highlight-white" href="#">
                Account Management
              </a>
            </li>
          </ul>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <div id="search-form" className="form-inline my-2 my-lg-0">
                  <Field
                    name="search"
                    component="input"
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="dropdown">
                    <input
                      type="checkbox"
                      id="my-dropdown"
                      value=""
                      name="my-checkbox"
                    />
                    <label htmlFor="my-dropdown" data-toggle="dropdown">
                      VINs
                    </label>
                    <ul>
                      <li>
                        <a href="#">19UYA30</a>
                      </li>
                      <li>
                        <a href="#">3XZ2A310</a>
                      </li>
                      <li>
                        <a href="#">3XZ2A310</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-2x fa-bell" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-2x fa-truck" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link highlight-white"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  FLUIDARC, INC 00-0077581{" "}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div id="content-area" className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <div className="bg-light" id="content-area-menu">
                <div className="content-menu-item item-active">Account</div>
                <div className="content-menu-item">Driver Authority</div>
                <div className="content-menu-item">Notification Settings</div>
              </div>
            </div>

            <div className="col-sm-9">
              <div className="bg-light panel" id="user-info">
                <div className="row">
                  <div className="col-3">
                    <span className="label">Username</span>
                    <Field
                      name="username"
                      component="input"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="col-3">
                    <span className="label">Password</span>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-3">
                    <span className="label"> Confirm Password</span>
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="panel bg-light" id="company-info">
                <div className="row panel-header-section">
                  <div className="col-3">Company</div>
                  <div className="col-3">Address</div>
                  <div className="col-3">E-file Signed By</div>
                  <div className="col-3">Contact</div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <p>
                      <span className="label">Name</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">EIN</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label"> Structure</span>
                      <select className="custom-select form-control">
                        <option>Texas</option>
                        <option>Proprietorship</option>
                        <option>Partnership</option>
                        <option>Corporation</option>
                      </select>
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">Address</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">City</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label"> State</span>
                      <select className="custom-select form-control">
                        <option>Texas</option>
                        <option>Florida</option>
                        <option>New Mexico</option>
                        <option>California</option>
                        <option>Ohio</option>
                      </select>
                    </p>
                    <p>
                      <span className="label">Country</span>
                      <select className="custom-select form-control">
                        <option>USA</option>
                        <option>Mexico</option>
                        <option>China</option>
                        <option>Japan</option>
                        <option>Brazil</option>
                        <option>Costa Rica</option>
                      </select>
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">Name</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">Title</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">5 Digit PIN</span>
                      <input type="password" className="form-control" />
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">Name</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">Email</span>
                      <Field
                        name="email"
                        component="input"
                        type="text"
                        className="form-control"
                      />
                    </p>
                    <p>
                      <span className="label">Office Phone</span>
                      <input type="text" className="form-control" />
                    </p>
                    <p>
                      <span className="label">Cellular Phone</span>
                      <input type="text" className="form-control" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel bg-light" id="third-party-info">
                <div className="row panel-header-section">
                  Third Party Designee
                </div>
                <div className="row">
                  <div className="col-3">
                    <p>
                      <input className="apple-switch" type="checkbox" />
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">Full Name</span>
                      <input type="text" className="form-control" />
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">Phone Number</span>
                      <input type="text" className="form-control" />
                    </p>
                  </div>
                  <div className="col-3">
                    <p>
                      <span className="label">PIN</span>
                      <input type="text" className="form-control" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel bg-light" id="driver-authority">
                <div className="row custom-panel-row">
                  <div className="col-sm-10">
                    <strong>
                      {" "}
                      Drive under the authority of a lease or contract company?{" "}
                    </strong>
                  </div>
                  <div className="col-sm-2">
                    <input className="apple-switch" type="checkbox" />
                  </div>
                </div>
                <div className="row custom-panel-row">
                  <div className="col-sm-6">
                    Your Operating Authority (MC Number)
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    Which Load Board(s) do you prefer?
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row custom-panel-row">
                  <div className="col-sm-10">
                    Do you use a permit company for compliance services?
                  </div>
                  <div className="col-sm-2">
                    <input className="apple-switch" type="checkbox" />
                  </div>
                </div>
                <div className="row custom-panel-row">
                  <div className="col-sm-10">
                    Do you use a factoring company?
                  </div>
                  <div className="col-sm-2">
                    <input className="apple-switch" type="checkbox" />
                  </div>
                </div>
              </div>

              <div className="panel bg-light" id="notification">
                <div className="row custom-panel-row">
                  <div className="col-sm-10">
                    Email notifications:rubash@fluidarc.com
                  </div>
                  <div className="col-sm-2">
                    <input className="apple-switch" type="checkbox" />
                  </div>
                </div>
                <div className="row custom-panel-row">
                  <div className="col-sm-10">
                    SMS Notifications:281-798-7714
                  </div>
                  <div className="col-sm-2">
                    <input className="apple-switch" type="checkbox" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: FORM_NAME
})(Account);
