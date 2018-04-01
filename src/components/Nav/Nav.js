import React from 'react'
import Link from 'gatsby-link'
import {withPrefix} from 'gatsby-link'
import "./Nav.less"
import logo from "./images/logo.png"

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className='navbar'>
    <div className='logo'><Link to='/'><img src={logo} /></Link></div>
    <div className='menu'>
      <Link to='/archive'>Статті</Link>
      <Link to='/forum'>Форум</Link>
      <Link to='/about'>Про проект</Link>
      <Link to='/faq'>FAQ</Link>
    </div>
    <div className='social-links'>
    <br /></div>
  </div>
  }
}

export default Navbar