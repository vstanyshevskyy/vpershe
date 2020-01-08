import React from 'react';
import { graphql } from 'gatsby';
import ListPage from './listPage';

export default props => {
  const { data: { advice: { edges } } } = props;
  const entries = edges.map(entry => ({ ...entry.node.frontmatter, html: entry.node.html }));

  return (
    <ListPage {...props}>
      {entries.map(({ title, html }) => (
        <li id={title} className="article-card article-card--advice" key={title}>
          <h3 className="article-card__title article-card__title--advice">
            { title }
          </h3>
          <div className="article-card__content" dangerouslySetInnerHTML={{ __html: html }} />
        </li>
      ))}
    </ListPage>
  );
};

export const pageQuery = graphql`
  query adviceListQuery($skip: Int!, $limit: Int!) {
    advice: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { eq: "advice" }}}
      sort: { fields: [frontmatter___publishTime], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
    settings: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { glob: "advice_settings" }}}
    ) {
      edges {
        node {
          html
          frontmatter {
            contentType
            title
            metaDescription
            metaKeywords
          }
        }
      }
    }
  }
`;
