import React from "react";
import classNames from "classnames";

const ValidatingInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className={classNames({ error: touched && error })}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default ValidatingInputField;
