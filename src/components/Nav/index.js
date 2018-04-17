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
        <NavbarBrand href="/">
          <img src={logo} alt="Вперше" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem><Link to="/archive">Архів</Link></NavItem>
            <NavItem><Link to="/">Форум</Link></NavItem>
            <NavItem><Link to="/about">Про проект</Link></NavItem>
            <NavItem><Link to="/faq">FAQ</Link></NavItem>
          </Nav>
          <div className="social-links ml-auto">
            <br />
          </div>
        </Collapse>
      </Navbar>);
  }
}
