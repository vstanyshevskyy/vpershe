import React from 'react';
import ArticleCard from '../article-card';
import './index.less';

export default props => (
  <ul className="articles-list">
    {
      props.items.map(i => {
        const url = `/stories/${i.path}`;
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
