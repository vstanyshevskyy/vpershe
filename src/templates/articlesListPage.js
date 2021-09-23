import React from 'react';
import { graphql } from 'gatsby';
import ArticleCard from '../components/article-card';
import ListPage from './listPage';

const ArticlesListPage = props => {
  const { data: { articles: { edges } }, pageContext: { category } } = props;
  const entries = edges.map(entry => entry.node.frontmatter);

  return (
    <ListPage {...props}>
      {entries.map(entry => {
        const url = `/${category}/${entry.path}`;
        return (
          <ArticleCard
            key={url}
            url={url}
            title={entry.title}
            subtitle={entry.subtitle}
            image={entry.image}
            image_half={entry.image_half}
            image_alt={entry.image_alt}
            category={category}
            type="half"
          />
        );
      })}
    </ListPage>
  );
};

export default ArticlesListPage;

export const pageQuery = graphql`
  query contentListQuery($skip: Int!, $limit: Int!, $category: String!) {
    articles: allMarkdownRemark(
      filter: { frontmatter:  { category: { eq: $category }}}
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
            image_half: image {
              relativePath
              childImageSharp {
                fluid(maxWidth: 495, maxHeight: 328) {
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
            title
            metaDescription
            metaKeywords
          }
        }
      }
    }
  }
`;
