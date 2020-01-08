import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import SEO from './SeoDisplay';

export default props => (
  <StaticQuery
    query={graphql`
      query SeoDefaultsQuery {
        seoDefaults: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "general_settings"}}}) {
          edges {
            node {
              frontmatter {
                title
                url
                favicon  {
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
    `}
    render={({ seoDefaults: { edges: [{ node: { frontmatter: defaults } }] } }) => (
      <SEO defaults={defaults} {...props} />
    )}
  />
);
