import React from 'react';
import { graphql } from 'gatsby';
import ListPage from './articlesListPage';

export default props => <ListPage {...props} />;

export const pageQuery = graphql`
  query tagContentListQuery($skip: Int!, $limit: Int!, $category: String!, $tag: String!) {
    articles: allMarkdownRemark(
      filter: {
        frontmatter: {
          contentType: { eq: "post" }
          category: { eq: $category }
          tags: { in: [$tag] }
        }
      }
      sort: { fields: [frontmatter___publishTime], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            category
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
            title: tags_title
            metaDescription: tags_metaDescription
            metaKeywords: tags_metaKeywords
          }
        }
      }
    }
  }
`;
