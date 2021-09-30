import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ThemeContext from '../../context/ThemeContext';
import './index.less';

export default ({ pageName, tags, current }) => {
  if (!tags || !tags.length) {
    return null;
  }
  return (
    <ThemeContext.Consumer>
      {({ isDarkModeEnabled }) => (
        <div className={`tags tags--${pageName}`}>
          <ul className="tags__list">
            { tags.map(tag => {
              const url = `/${pageName}/tags/${tag}`;
              const linkClasses = classNames('tags__tag-link', {
                'tags__tag-link--dark': isDarkModeEnabled,
                'tags__tag-link--current': tag === current
              });
              return (
                <li key={url} className={`tags__tag tags__tag--${pageName}`}>
                  <Link className={linkClasses} to={url}>
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};
