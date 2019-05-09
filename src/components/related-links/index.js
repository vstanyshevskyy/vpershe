import React from 'react';
import { Link } from 'gatsby';
import './index.less';

export default ({ links = [], title = 'Цікаве для тебе' }) => (
  <div className="related-articles">
    <h5 className="related-articles__title">{title}</h5>
    <ul className="related-articles__list">
      {
        links.map(link => (
          <li key={link.url} className="related-articles__list-item">
            <Link className="related-articles__link" to={link.url}>{link.title}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);
