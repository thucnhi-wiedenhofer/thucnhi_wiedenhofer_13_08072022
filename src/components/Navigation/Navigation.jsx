import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <NavLink className="main-nav-item" to="./SignIn">
        <i className="fa fa-user-circle"></i>
        Sign In
      </NavLink>
    </div>
  );
}

export default Navigation;
