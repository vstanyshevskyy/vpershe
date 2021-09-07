import React from 'react';
import { graphql } from 'gatsby';
import ArticleCard from '../components/article-card';
import ListPage from './listPage';

const ArticlesListPage = props => {
  const { data: { articles: { edges } }, pageContext: { contentType } } = props;
  const entries = edges.map(entry => entry.node.frontmatter);

  return (
    <ListPage {...props}>
      {entries.map(entry => {
        const url = `/${contentType}/${entry.path}`;
        return (
          <ArticleCard
            key={url}
            url={url}
            title={entry.title}
            subtitle={entry.subtitle}
            image={entry.image}
            image_alt={entry.image_alt}
            contentType={contentType}
          />
        );
      })}
    </ListPage>
  );
};

export default ArticlesListPage;

export const pageQuery = graphql`
  query contentListQuery($skip: Int!, $limit: Int!, $contentType: String!) {
    articles: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { eq: $contentType }}}
      sort: { fields: [frontmatter___publishTime], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            title
            subtitle
            image {
              relativePath
              childImageSharp {
                fluid(maxWidth: 320, maxHeight: 320, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            image_alt
          }
        }
      }
    }
    settings: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { glob: "*_settings" }}}
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
