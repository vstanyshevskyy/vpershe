import React from 'react';
import Link from 'gatsby-link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

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
    return (
      <Navbar color="light" light expand="md" className={this.props.className}>
        <NavbarBrand href="/" className="col-2">
          <img src={logo} alt="Вперше" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar className="justify-content-center col-md-8">
          <Nav className="justify-content-center" navbar>
            {(this.props.links || []).map(link =>
              <NavItem key={link.url}><Link to={link.url}>{link.text}</Link></NavItem>)}
          </Nav>
        </Collapse>
        <SocialIcons icons={this.props.socialIcons} />
      </Navbar>);
  }
}
