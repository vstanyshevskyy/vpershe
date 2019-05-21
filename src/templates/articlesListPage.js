import React from 'react';
import { graphql } from 'gatsby';
import ArticleCard from '../components/article-card';
import ListPage from './listPage';

export default props => {

  console.log(props);
  const { data: { allMarkdownRemark: { edges } }, pageContext } = props;
  const { contentType } = pageContext;
  const entries = edges.map(entry => entry.node.frontmatter);

  return (
    <ListPage {...props}>
      {entries.map(entry => {
        const url = `/${contentType}/${entry.path}`;
        return (
          <ArticleCard
            url={url}
            title={entry.title}
            subtitle={entry.subtitle}
            image={entry.image}
            image_alt={entry.image}
            contentType={contentType}
          />
        );
      })}
    </ListPage>
  );
};

export const pageQuery = graphql`
  query contentListQuery($skip: Int!, $limit: Int!, $contentType: String!) {
    allMarkdownRemark(
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
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image_alt
            carousel_featured
            tags
            publishTime
            metaKeywords
            metaDescription
            contentType
            related_sidebar {
              path
            }
            related_bottom {
              path
            }
          }
        }
      }
    }
  }
`;
