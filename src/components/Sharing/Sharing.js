import React from 'react';

import '../../layouts/ui-elems.css';
import './Sharing.css';

export default class Sharing extends React.Component {
  render() {
    return (
      <SocialSharing />
    );
  }
}

function SocialSharing() {
  return (
    <div className="social-sharing">
      <ul>
        <li>
          <a href="/">
            <i className="material-icons">face</i>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="material-icons">insert_emoticon</i>
          </a>
        </li>
      </ul>
    </div>
  );
}
