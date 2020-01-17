import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import './index.less';

export default ({ pages, current, prefix }) => {
  const list = [];
  for (let i = 0; i < pages; i++) {
    const classes = classNames(
      'pagination__link',
      `pagination__link--${prefix}`, {
        'pagination__link--current': i + 1 === current
      }
    );
    const url = `/${prefix}/${i === 0 ? '' : i + 1}`;
    list.push((
      <li key={url} className="pagination__page">
        <Link className={classes} to={url}>
          {i + 1}
        </Link>
      </li>
    ));
  }
  return (
    <ul className="pagination">
      {list}
    </ul>
  );
};
