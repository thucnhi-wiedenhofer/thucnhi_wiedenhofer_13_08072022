import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/authSlice';

function Navigation() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const logOut = () => {
    dispatch(logout());
  };

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
    return (
      <div>
        <NavLink className="main-nav-item" to="./SignIn">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    );
  }
}

export default Navigation;
