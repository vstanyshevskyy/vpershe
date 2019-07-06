import React from 'react';
import { graphql } from 'gatsby';
import ListPage from './adviceListPage';

export default props => <ListPage {...props} />;

export const pageQuery = graphql`
  query adviceTagListQuery($skip: Int!, $limit: Int!, $tag: String!) {
    advice: allMarkdownRemark(
      filter: {
        frontmatter:  {
          contentType: { eq: "advice" }
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
            title
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
