import React from 'react';
import PropTypes from 'prop-types';
import './error.css';
import _ from 'lodash';

const Error = ({errorMessage}) => (
  <div>
    {!_.isEmpty(errorMessage) && (
      <div className="errorBox">
        <p>{errorMessage}</p>
      </div>
    )}
  </div>
);

Error.propTypes = {
  errorMessage: PropTypes.string
};

export default Error;