import React from 'react';
import Link from 'gatsby-link';
import classNames from 'classnames';
import FaBars from 'react-icons/lib/fa/bars';
import FaClose from 'react-icons/lib/fa/close';

import SocialIcons from '../social-icons';
import logo from './images/logo.png';
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
      'nav--expanded': this.state.isOpen
    });
    return (
      <nav className={navClasses}>
        <div className="nav__inner">
          <Link href="/" className="nav__logo"><img src={logo} alt="Вперше" /></Link>
          <button onClick={this.toggle} className="nav__burger-btn">
            { this.state.isOpen ? <FaClose /> : <FaBars /> }
          </button>
          <ul className="nav__menu">
            {(this.props.links || []).map(link => (
              <li className="nav__menu-item" key={link.url}>
                <Link className="nav__menu-link" to={link.url}>{link.text}</Link>
              </li>))}
          </ul>
          <SocialIcons listItemClassName="nav__social-icons-item" linkClassName="nav__social-icons-item-link" listClassName="nav__social-icons" icons={this.props.socialIcons} />
        </div>
      </nav>
    );
  }
}
