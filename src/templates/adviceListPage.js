import React from 'react';
import ListPage from './listPage';

export default props => {
  const { pageContext } = props;
  const adviceList = pageContext.group.map(advice => (
    Object.assign({}, {
      html: advice.node.html
    }, advice.node.frontmatter)));
  return (
    <ListPage {...props}>
      {adviceList.map(advice => (
        <li id={advice.url} className="article-card article-card--advice">
          <h3 className="article-card__title article-card__title--advice">
            { advice.title }
          </h3>
          <div className="article-card__content" dangerouslySetInnerHTML={{ __html: advice.html }} />
        </li>
      ))}
    </ListPage>
  );
};
