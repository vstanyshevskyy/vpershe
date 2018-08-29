import React from 'react';
import classNames from 'classnames';
import './index.less';

export default props => {
  const pages = [];
  for (let i = 0; i < props.pages; i++) {
    const classes = classNames(
      'pagination__link',
      `pagination__link--${props.prefix}`, {
        'pagination__link--current': i + 1 === props.current
      }
    );
    pages.push((
      <li className="pagination__page">
        <a className={classes} href={`/${props.prefix}/${i === 0 ? '' : i + 1}`}>
          {i + 1}
        </a>
      </li>
    ));
  }
  return (
    <ul className="pagination">
      {pages}
    </ul>
  );
};
