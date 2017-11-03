import React from 'react';
import { connect } from 'react-redux';
import { isBusy } from '../busyIndicator.selector';
import Indicator from './indicator.svg';
import './busyIndicator.css';

const BusyIndicatorContainer = ({isBusy, children}) => {
  return isBusy ?
    <img className="loader" src={Indicator} alt="Busy indicator"/> :
    children
};

const mapStateToProps = state => ({
  isBusy: isBusy(state)
});

export default connect(mapStateToProps)(BusyIndicatorContainer);
