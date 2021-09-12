import React from 'react';
import ArticleCard from '../article-card';
import './index.less';

export default ({ items }) => (
  <ul className="articles-list">
    {
      items.map(({
        title, subtitle, image, image_alt: imageAlt, category, path
      }) => {
        const url = `/${category}/${path}`;
        return (
          <ArticleCard
            key={url}
            title={title}
            subtitle={subtitle}
            image={image}
            image_alt={imageAlt}
            url={url}
            category={category}
          />
        );
      })
    }
  </ul>
);
