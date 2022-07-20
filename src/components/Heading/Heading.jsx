import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Heading/heading.css';

function Heading() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        <span>{`${account.firstName + ' ' + account.lastName + '!'}`}</span>
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default Heading;
