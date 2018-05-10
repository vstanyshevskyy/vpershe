import React from 'react';

import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaGoogle from 'react-icons/lib/fa/google';
import FaInstagram from 'react-icons/lib/fa/instagram';
import './index.less';

export default class SocialIcons extends React.Component {
  render() {
    const listClassName = this.props.listClassName || 'navbar-nav col-2 justify-content-end d-none d-md-flex social-icons';
    const listItemClassName = this.props.listItemClassName || 'nav-item';
    const linkClassName = this.props.linkClassName || 'nav-link';
    return (
      <ul className={listClassName}>
        {this.props.icons.map(icon => {
          let faIcon;
          switch (icon.type) {
          case 'Facebook':
            faIcon = <FaFacebook />;
            break;
          case 'Twitter':
            faIcon = <FaTwitter />;
            break;
          case 'Instagram':
            faIcon = <FaInstagram />;
            break;
          case 'Google':
            faIcon = <FaGoogle />;
            break;
          default:
            faIcon = null;
            break;
          }
          return (
            <li key={icon.type} className={listItemClassName}>
              <a className={linkClassName} href={icon.url}>
                {faIcon}
              </a>
            </li>);
        })}
      </ul>
    );
  }
}

