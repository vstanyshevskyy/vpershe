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
    render={(
      {
        aboutProject: { edges: [{ node: { html } }] }
      }
    ) => (
      <div className="about-project">
        <h1 className="about-project__header">Про проект</h1>
        <img className="about-project__graffiti--stars graffiti graffiti--stars" loading="lazy" alt="" width="86" src={withPrefix('assets/graffiti/stars.svg')} aria-hidden="true" />
        <div className="about-project__text" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )}
  />
);
