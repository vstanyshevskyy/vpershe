import React from 'react';
import Link from 'gatsby-link';
import Config from '../../config';
import './index.less';

export default props => (
  <div className="advice">
    <h2>Поради</h2>
    <ul className="advice__list">
      { props.items.map((item, index) => {
        const page = Math.floor(index / Config.advice.perPage) + 1;
        const displayPage = page === 1 ? '' : `/${page}`;
        const url = `/advice${displayPage}#${item.url}`;
        return (
          <li key={url} className="advice__item">
            <Link className="advice__item-link" to={url}>
              {item.title}
            </Link>
          </li>
        );
      })
      }
    </ul>
  </div>
);
