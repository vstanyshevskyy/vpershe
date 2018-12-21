import React from 'react';
import Link, { withPrefix } from 'gatsby-link';
import Config from '../../config';
import './index.less';

export default props => (
  <div className="advice">
    <h2>Поради</h2>
    <img className="advice__graffiti advice__graffiti--moon graffiti graffiti--moon" alt="" width="78" src={withPrefix('assets/graffiti/moon.svg')} aria-hidden="true" />
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
    <img className="advice__graffiti advice__graffiti--planet graffiti graffiti--planet" alt="" width="99" src={withPrefix('assets/graffiti/planet.svg')} aria-hidden="true" />
  </div>
);
