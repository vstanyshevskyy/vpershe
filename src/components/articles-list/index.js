import React from 'react';
import ArticleCard from '../article-card';
import './index.less';

export default props => (
  <ul className="articles-list">
    {
      props.items.map(i => (
        <ArticleCard
          title={i.title}
          subtitle={i.subtitle}
          image={i.list_image}
          url={`/stories/${i.path}`}
        />
      ))
    }
  </ul>
);
