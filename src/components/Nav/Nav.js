import React from 'react';
import Link from 'gatsby-link';
import logo from './images/logo.png';
import './Nav.less';

const Navbar = () => (
  <div className="navbar">
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Вперше" />
      </Link>
    </div>
    <div className="menu">
      <Link to="/archive">Архів</Link>
      <Link to="/">Форум</Link>
      <Link to="/about">Про проект</Link>
      <Link to="/faq">FAQ</Link>
    </div>
    <div className="social-links">
      <br />
    </div>
  </div>
);

export default Navbar;
