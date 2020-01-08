import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Carousel from './CarouselDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query CarouselQuery {
        carouselItems: allMarkdownRemark(
          filter: { frontmatter:  { carousel_featured: { eq: true} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
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
                    fluid(maxWidth: 170, maxHeight: 170, cropFocus: CENTER, fit: COVER) {
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
    render={({ carouselItems: { edges: itemsRaw = [] } }) => (
      <Carousel items={itemsRaw.map(i => i.node.frontmatter)} />
    )}
  />
);
