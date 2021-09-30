import React from 'react';

import { StaticQuery, graphql } from 'gatsby';

import HomePageArticlesDisplay from './HomePageArticlesDisplay';
import './index.less';

export default () => (
  <StaticQuery
    query={graphql`
      query HomePageArticlesQuery {
        articles: allMarkdownRemark(
          filter: { frontmatter:  { contentType: { eq: "post"} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
        ){
          edges{
            node{
              frontmatter {
                title
                category
                path
                image {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 533, maxHeight: 350) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
                image_full: image {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 1020, maxHeight: 674) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
                image_half: image {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 495, maxHeight: 328) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
                image_third: image {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 321, maxHeight: 212) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
                image_alt
                path
              }
            }
          }
        }
      }
    `}
    render={({ articles: { edges: itemsRaw = [] } }) => (
      <HomePageArticlesDisplay items={itemsRaw.map(i => ({...i.node.frontmatter, url: `/${i.node.frontmatter.category}/${i.node.frontmatter.path}`}))} />
    )}
  />
)