import React from 'react';
import ArticleCard from '../components/article-card';
import ListPage from './listPage';

export default props => {
  const { pageContext } = props;
  const { group, additionalContext: { contentType } } = pageContext;
  const entries = group.map(entry => entry.node.frontmatter);

  return (
    <ListPage {...props}>
      {entries.map(entry => {
        const url = `/${contentType}/${entry.path}`;
        return (
          <ArticleCard
            url={url}
            title={entry.title}
            subtitle={entry.subtitle}
            image={entry.list_image_articles || entry.list_image}
            image_alt={entry.list_image_alt}
            contentType={contentType}
          />
        );
      })}
    </ListPage>
  );
};
