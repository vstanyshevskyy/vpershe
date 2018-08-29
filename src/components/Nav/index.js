import React from 'react';
import Link, { withPrefix } from 'gatsby-link';
import classNames from 'classnames';
import FaBars from 'react-icons/lib/fa/bars';
import FaClose from 'react-icons/lib/fa/close';

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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const navClasses = classNames('nav', {
      'nav--expanded': this.state.isOpen,
      'nav--custom': this.props.className
    });
    const navInnerClasses = classNames('nav__inner', {
      'nav__inner--custom': this.props.className
    });
    return (
      <nav className={navClasses}>
        <div className={navInnerClasses}>
          <Link to="/" className="nav__logo"><img src={withPrefix('assets/logo/black_text.svg')} alt="Вперше" /></Link>
          <button onClick={this.toggle} className="nav__burger-btn">
            { this.state.isOpen ? <FaClose /> : <FaBars /> }
          </button>
          <ul className="nav__menu">
            {(this.props.links || []).map(link => {
              const linkClasses = classNames('nav__menu-link', {
                'nav__menu-link--current': this.props.location.startsWith(link.url)
              }, `nav__menu-link--${link.url.split('/')[1]}`);
              return (
                <li className="nav__menu-item" key={link.url}>
                  <Link className={linkClasses} to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <SocialIcons listItemClassName="nav__social-icons-item" linkClassName="nav__social-icons-item-link" listClassName="nav__social-icons" icons={this.props.socialIcons} />
        </div>
      </nav>
    );
  }
}
