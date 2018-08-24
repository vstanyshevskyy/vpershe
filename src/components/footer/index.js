import React from 'react';
import Link from 'gatsby-link';
import SocialIcons from '../social-icons';
import './index.less';
import logo from './images/logo.png';

export default props => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__logo-icons-wrapper">
        <Link href="/" className="nav__logo"><img src={logo} alt="Вперше" /></Link>
        <SocialIcons
          icons={props.socialIcons}
          listClassName="social-icons-container"
          listItemClassName="social-icons-item"
          linkClassName="social-icons-link--footer"
        />
      </div>
      <ul className="footer__nav" role="navigation">
        {props.bottomLinks.map(link => (
          <li className="footer__nav-item" key={link.url} >
            <Link className="footer__nav-link" to={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
      <div className="footer__copyright">
        {props.copyrightText}
      </div>
    </div>
  </footer>
);

