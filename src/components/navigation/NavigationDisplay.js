import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import {
  FaBars, FaTimes, FaMoon, FaSun
} from 'react-icons/fa';

import Logo from '../logo';

import SocialIcons from '../social-icons';
import './index.less';

export default class VpersheNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const {
      className, links = [], location, socialIcons, isDarkModeEnabled, toggleDark
    } = this.props;
    const { isOpen } = this.state;
    const navClasses = classNames('nav', {
      'nav--expanded': isOpen,
      'nav--custom': className,
      'nav--dark': isDarkModeEnabled
    });
    const navInnerClasses = classNames('nav__inner', {
      'nav__inner--custom': className
    });
    const navBurgerBtnClasses = classNames('nav__burger-btn', {
      'nav__burger-btn--dark': isDarkModeEnabled
    });
    return (
      <nav className={navClasses}>
        <div className={navInnerClasses}>
          <Link to="/" className="nav__logo">
            <Logo />
          </Link>
          <button type="button" className={classNames('nav__theme-switcher', { 'nav__theme-switcher--dark': isDarkModeEnabled })} onClick={toggleDark} aria-label="Увімкнути нічний режим відображення">
            {isDarkModeEnabled ? <FaSun /> : <FaMoon />}
          </button>
          <button
            type="button"
            onClick={this.toggle}
            className={navBurgerBtnClasses}
            aria-label="Menu"
            aria-expanded={isOpen}
            aria-controls="nav__menu"
          >
            { isOpen ? <FaTimes /> : <FaBars /> }
          </button>
          <ul className="nav__menu" id="nav__menu">
            {links.map(({ url, text }) => {
              const linkClasses = classNames('nav__menu-link', {
                'nav__menu-link--current': location.startsWith(url),
                'nav__menu-link--dark': isDarkModeEnabled,
                'nav__menu-link--dark-current': isDarkModeEnabled && location.startsWith(url)
              }, `nav__menu-link--${url.split('/')[1]}`);
              return (
                <li className="nav__menu-item" key={url}>
                  <Link className={linkClasses} to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}
