import React from 'react'
import Link from 'gatsby-link'
import './index.less'
import {withPrefix} from 'gatsby-link'
import Navbar from '../Nav/Nav'

const Header = () => (
  <div className='header'>
    <Navbar />
  </div>
);

export default Header
