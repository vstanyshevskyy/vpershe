import React from 'react';
import ArticleCard from '../article-card';
import './index.less';

export default ({ items, type }) => (
  <ul className="articles-list">
    {
      items.map(({
       image_alt: imageAlt, category, path, ...rest
      }) => {
        const url = `/${category}/${path}`;
        return (
          <ArticleCard
            key={url}
            image_alt={imageAlt}
            url={url}
            category={category}
            type={type}
            {...rest}
          />
        );
      })
    }
  </ul>
);
