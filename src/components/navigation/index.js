import React from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';
import {
  FaBars, FaTimes, FaMoon, FaSun
} from 'react-icons/fa';

import ThemeContext from '../../context/ThemeContext';
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
      className, links, location, socialIcons
    } = this.props;
    const { isOpen } = this.state;
    const { isDarkModeEnabled, toggleDark } = this.context;
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
    const logoSrc = isDarkModeEnabled
      ? 'assets/logo/white_text.svg'
      : 'assets/logo/black_text.svg';
    return (
      <nav className={navClasses}>
        <div className={navInnerClasses}>
          <Link to="/" className="nav__logo">
            <img loading="lazy" src={withPrefix(logoSrc)} alt="Вперше" />
          </Link>
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
            {(links || []).map(link => {
              const linkClasses = classNames('nav__menu-link', {
                'nav__menu-link--current': location.startsWith(link.url),
                'nav__menu-link--dark': isDarkModeEnabled,
                'nav__menu-link--dark-current': isDarkModeEnabled && location.startsWith(link.url)
              }, `nav__menu-link--${link.url.split('/')[1]}`);
              return (
                <li className="nav__menu-item" key={link.url}>
                  <Link className={linkClasses} to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <SocialIcons
            listItemClassName="nav__social-icons-item"
            linkClassName={classNames('nav__social-icons-item-link', {
              'nav__social-icons-item-link--dark': isDarkModeEnabled
            })}
            listClassName="nav__social-icons"
            icons={socialIcons}
          />
          <button type="button" className={classNames('nav__theme-switcher', { 'nav__theme-switcher--dark': isDarkModeEnabled })} onClick={toggleDark} aria-label="Увімкнути нічний режим відображення">
            {isDarkModeEnabled ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    );
  }
}

VpersheNav.contextType = ThemeContext;
