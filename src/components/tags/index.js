import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ThemeContext from '../../context/ThemeContext';
import './index.less';

export default ({ pageName, tags, current }) => (
  <ThemeContext.Consumer>
    {({ isDarkModeEnabled }) => (
      <div className={`tags tags--${pageName}`}>
        <h3 className={classNames(`tags__title tags__title--${pageName}`, {
          'tags__title--dark': isDarkModeEnabled
        })}
        >
          Теги
        </h3>
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
