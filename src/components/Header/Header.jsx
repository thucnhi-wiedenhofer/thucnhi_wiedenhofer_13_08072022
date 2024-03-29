import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/argentBankLogo.png';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <Navigation />
      </nav>
    </>
  );
}

export default Header;
