import React from 'react';
import Link from 'gatsby-link';
import './index.less';

export default props => (
  <div className="related-articles">
    <h5 className="related-articles__title" >Цікаве для тебе</h5>
    <ul className="related-articles__list">
      {
        (props.links || []).map(link => (
          <li>
            <Link key={link.url} className="related-articles__link" to={link.url}>{link.title}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);
