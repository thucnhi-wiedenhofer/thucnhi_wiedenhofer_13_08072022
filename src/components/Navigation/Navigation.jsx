import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { reset } from '../../store/accountSlice';

function Navigation() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
  };
  // Navigation if user is connected:
  if (sessionStorage.getItem('isLogged') && sessionStorage.getItem('token')) {
    return (
      <div>
        <NavLink className="main-nav-item" to="./User">
          <i className="fa fa-user-circle"></i>
          <span> {account.firstName}</span>
        </NavLink>
        <NavLink className="main-nav-item" to="./" onClick={logOut}>
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    );
  } else {
    // Navigation if user is not connected:
    return (
      <div>
        <NavLink className="main-nav-item" to="./LogIn">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    );
  }
}

export default Navigation;
