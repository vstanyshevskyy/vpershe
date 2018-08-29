import React, { Component } from 'react';
import Config from '../../config';
import './index.less';

export default props => (
  <div className="advice">
    <h2 className="highlighted">Поради</h2>
    <ul className="advice__list">
      { props.items.map((item, index) => {
        const page = Math.floor(index / Config.advice.perPage) + 1;
        const displayPage = page === 1 ? '' : `/${page}`;
        return (
          <li className="advice__item">
            <a className="advice__item-link" href={`/advice${displayPage}#${item.url}`}>
              {item.title}
            </a>
          </li>
        );
      })
      }
    </ul>
  </div>
);
