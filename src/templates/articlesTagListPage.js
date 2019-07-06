import React from 'react';
import { graphql } from 'gatsby';
import ListPage from './articlesListPage';

export default props => <ListPage {...props} />;

export const pageQuery = graphql`
  query tagContentListQuery($skip: Int!, $limit: Int!, $contentType: String!, $tag: String!) {
    articles: allMarkdownRemark(
      filter: {
        frontmatter: {
          contentType: { eq: $contentType }
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
    generalSettings: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { eq: "general_settings" }}}
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            url
            titleTemplate
            organizationTitle
            defaultAuthor
            favicon {
              relativePath
            }
            metaDescription
            metaKeywords
            fbTitle
            fbImage {
              relativePath
            }
            fbDescription
          }
        }
      }
    }
  }
`;
