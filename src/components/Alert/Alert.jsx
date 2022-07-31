import React from 'react';
import './alert.css';

//Alert Message if empty fields or email not valid in form
const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'red-gradient' : ''}`}>{alert.msg}</div>
  );
};

export default Alert;
