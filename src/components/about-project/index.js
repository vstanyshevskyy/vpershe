import React from 'react';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import './index.less';

export default () => (
  <StaticQuery
    query={graphql`
      query aboutProjectQuery {
        aboutProject: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
          edges {
            node {
              html
            }
          }
        }
      }
    `}
    render={({ aboutProject: { edges: [{ node: { html } }] } }) => (
      <div className="about-project">
        <h1 className="about-project__header">Про проект</h1>
        <div className="about-project__text" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )}
  />
);
