import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import AdviceList from './AdviceListDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentAdviceQuery {
        advice: allMarkdownRemark(
          filter: { frontmatter:  { contentType: { eq: "advice"}}}
          sort: { fields: [frontmatter___publishTime], order: DESC }
          limit: 10
        ) {
          edges {
            node {
              frontmatter {
                title
                url
              }
            }
          }
        }
      }
    `}
    render={({ advice: { edges: itemsRaw = [] } }) => (
      <AdviceList items={itemsRaw.map(i => i.node.frontmatter)} />
    )}
  />
);
