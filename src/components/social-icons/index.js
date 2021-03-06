import React from 'react';

import {
  FaFacebookF, FaTwitter, FaGoogle, FaInstagram
} from 'react-icons/fa';
import './index.less';

export default class SocialIcons extends React.Component {
  getIconComponent(type) {
    switch (type) {
    case 'Facebook':
      return <FaFacebookF className="social-icon social-icon--facebook" />;
    case 'Twitter':
      return <FaTwitter className="social-icon social-icon--twitter" />;
    case 'Instagram':
      return <FaInstagram className="social-icon social-icon--instagram" />;
    case 'Google':
      return <FaGoogle className="social-icon social-icon--google" />;
    default:
      return null;
    }
  }

  render() {
    const {
      listClassName, listItemClassName, linkClassName, icons = []
    } = this.props;
    const listClass = listClassName || 'navbar-nav col-2 justify-content-end d-none d-md-flex social-icons';
    const listItemClass = listItemClassName || 'nav-item';
    const linkClass = linkClassName || 'nav-link';
    return (
      <ul className={listClass}>
        {icons.map(({ type, url }) => (
          <li key={type} className={listItemClass}>
            <a className={linkClass} target="_blank" rel="noopener noreferrer" href={url} title={type}>
              {this.getIconComponent(type)}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
