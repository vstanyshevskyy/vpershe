import React from 'react';
import ArticleCard from '../article-card';
import './index.less';

export default ({ items }) => (
  <ul className="articles-list">
    {
      items.map(i => {
        const url = `/${i.contentType || 'stories'}/${i.path}`;
        return (
          <ArticleCard
            key={url}
            title={i.title}
            subtitle={i.subtitle}
            image={i.list_image}
            image_alt={i.list_image_alt}
            url={url}
          />
        );
      })
    }
  </ul>
);
