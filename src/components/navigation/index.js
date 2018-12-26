import React from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    const navClasses = classNames('nav', {
      'nav--expanded': isOpen,
      'nav--custom': className
    });
    const navInnerClasses = classNames('nav__inner', {
      'nav__inner--custom': className
    });
    return (
      <nav className={navClasses}>
        <div className={navInnerClasses}>
          <Link to="/" className="nav__logo"><img src={withPrefix('assets/logo/black_text.svg')} alt="Вперше" /></Link>
          <button type="button" onClick={this.toggle} className="nav__burger-btn" aria-label="Menu">
            { isOpen ? <FaTimes /> : <FaBars /> }
          </button>
          <ul className="nav__menu">
            {(links || []).map(link => {
              const linkClasses = classNames('nav__menu-link', {
                'nav__menu-link--current': location.startsWith(link.url)
              }, `nav__menu-link--${link.url.split('/')[1]}`);
              return (
                <li className="nav__menu-item" key={link.url}>
                  <Link className={linkClasses} to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <SocialIcons listItemClassName="nav__social-icons-item" linkClassName="nav__social-icons-item-link" listClassName="nav__social-icons" icons={socialIcons} />
        </div>
      </nav>
    );
  }
}
