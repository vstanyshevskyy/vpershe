import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ArticlesTiles from './ArticlesTilesDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        articles: allMarkdownRemark(
          filter: { frontmatter:  { contentType: { eq: "articles"} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
          limit: 2
        ){
          edges{
            node{
              frontmatter {
                title
                contentType
                path
                subtitle
                image {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 533, maxHeight: 350) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
                image_alt
              }
            }
          }
        }
      }
    `}
    render={({ articles: { edges: itemsRaw = [] } }) => (
      <ArticlesTiles items={itemsRaw.map(i => i.node.frontmatter)} />
    )}
  />
);
