import React from 'react';
import '../Heading/heading.css';

function Heading() {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        Tony Jarvis!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default Heading;
