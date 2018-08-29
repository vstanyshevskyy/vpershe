import React from 'react';
import Link, { withPrefix } from 'gatsby-link';
import classNames from 'classnames';
import './index.less';


export default props => {
  return (
    <div className={`tags tags--${props.pageName}`}>
      <h3 className={`tags__title tags__title--${props.pageName}`}>Теги</h3>
      <ul className="tags__list">
        { props.tags.map(tag => {
          const url = `/${props.pageName}/tags/${tag}`;
          const linkClasses = classNames('tags__tag-link', {
            'tags__tag-link--current': tag === props.current
          });
          return (
            <li className={`tags__tag tags__tag--${props.pageName}`}>
              <Link className={linkClasses} to={url}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
