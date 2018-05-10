import React from 'react';

import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaGoogle from 'react-icons/lib/fa/google';
import FaInstagram from 'react-icons/lib/fa/instagram';
import './index.less';

export default class SocialIcons extends React.Component {
  getIconComponent(iconData) {
    switch (iconData.type) {
    case 'Facebook':
      return <FaFacebook />;
    case 'Twitter':
      return <FaTwitter />;
    case 'Instagram':
      return <FaInstagram />;
    case 'Google':
      return <FaGoogle />;
    default:
      return null;
    }
  }
  render() {
    const listClassName = this.props.listClassName || 'navbar-nav col-2 justify-content-end d-none d-md-flex social-icons';
    const listItemClassName = this.props.listItemClassName || 'nav-item';
    const linkClassName = this.props.linkClassName || 'nav-link';
    return (
      <ul className={listClassName}>
        {(this.props.icons || []).map(icon => (
          <li key={icon.type} className={listItemClassName}>
            <a className={linkClassName} href={icon.url}>
              {this.getIconComponent(icon)}
            </a>
          </li>))}
      </ul>
    );
  }
}

