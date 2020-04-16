import React from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';
import {
  FaBars, FaTimes, FaMoon, FaSun
} from 'react-icons/fa';

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
            <svg className="nav__logo-img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 900 208" xmlSpace="preserve">
              <path className={classNames('nav__logo-text', { 'nav__logo-text--dark': isDarkModeEnabled })} d="M60.5 157.5V145l16.1-2.8V65.7L60.5 63V50.4h58.3c14.1 0 25.1 2.5 32.9 7.4s11.7 12.3 11.7 22.1c.1 4.9-1.6 9.6-4.6 13.4-3.3 4.2-7.8 7.3-12.9 9 6.7 1.7 11.9 4.7 15.6 9.3 3.7 4.3 5.7 9.8 5.6 15.4 0 10-3.6 17.6-10.9 22.8s-17.5 7.7-30.7 7.7h-65zm35.7-61.9H119c8.3 0 14.5-1.2 18.7-3.7 4-2.2 6.5-6.5 6.3-11.1 0-10.2-8.3-15.3-25-15.3H96.2v30.1zm0 46.9h29.5c7.3 0 12.7-1.4 16.4-4.1 3.7-2.7 5.5-6.7 5.6-11.8 0-5.1-1.8-9-5.6-11.8-3.7-2.8-9.2-4.2-16.4-4.2H96.2v31.9zM186.4 157.5V145l16.1-2.8V65.7L186.4 63V50.4h119V63l-16.1 2.8v76.5l16.2 2.7v12.5h-51.8V145l16.1-2.8V65.8h-47.7v76.4l16.1 2.7v12.5l-51.8.1zM369.6 159.6c-9.9 0-18.5-2.3-25.8-6.8-7.4-4.5-13.3-11.1-17-18.9-4-8-6-17.4-6-27.9v-4.4c-.2-9.5 2-18.8 6.3-27.3 3.9-7.7 9.6-14.2 16.7-19 6.7-4.6 14.7-7 22.8-7 9.6 0 17.7 2 24.2 5.9 6.5 3.9 11.6 9.7 14.7 16.7 3.3 7.2 5 15.6 5 25.3v12.2H341l-.3.5c0 6.3 1.2 12.5 3.6 18.3 2 5 5.5 9.4 9.9 12.5 4.5 3.1 9.9 4.7 15.4 4.6 5.9.1 11.8-.8 17.4-2.8 4.8-1.7 9.1-4.4 12.9-7.8l7.6 12.7c-4.4 4.1-9.6 7.2-15.2 9.4-6.2 2.5-13.8 3.8-22.7 3.8zm-28-66.3H391v-2.6c.1-4.7-.8-9.5-2.7-13.8-1.7-3.9-4.5-7.3-8.1-9.6-3.6-2.3-8.1-3.5-13.5-3.5-4.3 0-8.4 1.3-11.9 3.8-3.7 2.7-6.7 6.3-8.8 10.3-2.4 4.6-3.9 9.7-4.6 14.8l.2.6zM427.7 198.7v-12.6l15.1-2.8V65.7L426.7 63V50.4h32.9l1.8 13.1c3.4-4.7 7.8-8.6 13-11.2 5.5-2.7 11.6-4 17.8-3.9 8.8 0 16.4 2.4 22.7 7.2 6.3 4.8 11.1 11.5 14.4 20.1 3.3 8.6 5 18.7 5 30.2v2.1c0 10.3-1.7 19.3-5 27-3 7.3-7.9 13.5-14.3 18.1-6.2 4.3-13.7 6.5-22.4 6.5-6 .1-11.9-1-17.4-3.3-5-2.2-9.3-5.6-12.7-9.9v36.9l17 2.8v12.6h-51.8zm58.7-54.3c9.3 0 16.3-3.4 21-10.1s7.1-15.5 7.1-26.2V106c.1-7.3-.9-14.6-3.2-21.6-2.1-6.2-5.3-11.1-9.5-14.7s-9.4-5.3-15.7-5.3c-5-.1-9.9 1.2-14.2 3.8-4 2.6-7.3 6.1-9.6 10.3v52.2c2.2 4.2 5.5 7.7 9.6 10.2 4 2.3 8.8 3.5 14.5 3.5zM550 157.5V145l16.1-2.8V65.7L550 63V50.4h51.8V63l-16.1 2.8v76.5h37.6V50.4h19.5v91.9h37.7V65.7L664.4 63V50.4h51.8V63L700 65.7v76.5l16.2 2.7v12.5l-166.2.1zM781.9 159.6c-9.9 0-18.5-2.3-25.8-6.8-7.3-4.5-13.2-11.1-17-18.9-4-8-6-17.4-6-27.9v-4.4c-.2-9.5 2-18.8 6.3-27.3 3.9-7.7 9.6-14.2 16.7-19 6.7-4.6 14.7-7 22.8-7 9.6 0 17.7 2 24.2 5.9 6.5 3.9 11.6 9.7 14.7 16.7 3.3 7.2 5 15.6 5 25.3v12.2h-69.5l-.3.6c0 6.3 1.2 12.5 3.6 18.3 2 5 5.5 9.4 9.8 12.5 4.5 3.1 9.9 4.7 15.5 4.6 5.9.1 11.8-.8 17.4-2.8 4.8-1.7 9.1-4.4 12.9-7.8l7.6 12.7c-4.4 4.1-9.6 7.2-15.2 9.4-6.3 2.4-13.8 3.7-22.7 3.7zm-28-66.3h49.4v-2.6c.1-4.7-.8-9.5-2.7-13.8-1.7-3.9-4.5-7.3-8.1-9.6-3.6-2.3-8.1-3.5-13.5-3.5-4.3 0-8.4 1.3-11.9 3.8-3.7 2.7-6.7 6.3-8.8 10.3-2.4 4.6-3.9 9.7-4.5 14.8l.1.6z"/>
              <path className="nav__logo-braces" d="M850.6 207.9l-3.7-10.7c4.9-4 9.2-8.6 12.8-13.9 4.3-6.4 7.9-13.2 10.7-20.4 3.3-8.6 5.8-17.4 7.4-26.4 1.9-10.5 2.8-21.2 2.7-31.9v-1.3c.1-10.6-.9-21.1-2.8-31.5-1.7-9-4.2-17.8-7.6-26.3-2.8-7.2-6.4-14.1-10.8-20.5-3.5-5.3-7.7-10.1-12.4-14.2L850.6.1h.6c5.8 3 11.5 7.7 17.2 14 6.2 6.9 11.5 14.6 15.8 22.9 5 9.6 8.9 19.8 11.5 30.3 2.9 11.9 4.4 24.1 4.3 36.3v.9c.1 12.3-1.4 24.5-4.3 36.4-2.6 10.5-6.5 20.7-11.5 30.2-4.3 8.2-9.6 15.9-15.8 22.8-4.9 5.6-10.8 10.3-17.2 14h-.6zM0 4.9h19.5v198.2H0z"/>
            </svg>
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
