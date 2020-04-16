import React from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';

import Logo from '../logo';
import SocialIcons from '../social-icons';
import './index.less';

export default ({
  socialIcons, bottomLinks, copyrightText, isDarkModeEnabled
}) => (
  <footer className={classNames('footer',
    { 'footer--dark': isDarkModeEnabled })}
  >
    <div className="footer__inner">
      <div className="footer__logo-icons-wrapper">
        <Link to="/" className="nav__logo footer__logo">
          <Logo />
        </Link>
        <SocialIcons
          icons={socialIcons}
          listClassName="social-icons-container social-icons-container--black footer__social-icons-container"
          listItemClassName="social-icons-item"
          linkClassName="social-icons-link--footer"
        />
      </div>
      <div className="footer__nav-container" role="navigation">
        <ul className="footer__nav">
          {bottomLinks.map(({ url, text }) => (
            <li className="footer__nav-item" key={url}>
              <Link className="footer__nav-link" to={url}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer__copyright">
        {copyrightText}
      </div>
    </div>
  </footer>
);
