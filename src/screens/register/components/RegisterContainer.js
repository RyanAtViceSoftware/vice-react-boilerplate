import React from "react";
import Register from "./Register";

export default class RegisterContainer extends React.Component {
  handleSubmit = values => {
    alert(JSON.stringify(values));
  };

  render() {
    return <Register onSubmit={this.handleSubmit} />;
  }
}
