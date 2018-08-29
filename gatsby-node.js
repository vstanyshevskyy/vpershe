const path = require('path');
const config = require('./src/config');
const createPaginatedPages = require('gatsby-paginate');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      articles: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "articles"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              title
              subtitle
              image
              carousel_featured
              carousel_image
              list_image
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
            }
          }
        }
      }
      stories: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "stories"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              title
              subtitle
              image
              carousel_featured
              carousel_image
              list_image
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
            }
          }
        }
      }
      sexoteca: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "sexoteca"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              title
              subtitle
              image
              carousel_featured
              carousel_image
              list_image
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
            }
          }
        }
      }
      advice: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "advice"}}}) {
        edges {
          node {
            html
            frontmatter {
              url
              title
              tags
              contentType
            }
          }
        }
      }
      settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "general_settings"}}}) {
        edges {
          node {
            html
            frontmatter {
              title
              url
              titleTemplate
              organizationTitle
              defaultAuthor
              favicon
              metaDescription
              metaKeywords
              fbTitle
              fbImage
              fbDescription
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    ['advice', 'articles', 'stories', 'sexoteca'].forEach(contentType => {
      const contentByTags = {};
      result.data[contentType].edges.forEach(e => {
        e.node.frontmatter.tags.forEach(tag => {
          if (contentByTags[tag]) {
            contentByTags[tag].push(e);
          } else {
            contentByTags[tag] = [e];
          }
        });
      });
      createPaginatedPages({
        edges: result.data[contentType].edges,
        createPage,
        pageTemplate: 'src/templates/index.js',
        pageLength: config[contentType].perPage,
        pathPrefix: contentType,
        context: {
          contentType,
          tags: Object.keys(contentByTags)
        }
      });
      Object.keys(contentByTags).forEach(tag => {
        createPaginatedPages({
          edges: contentByTags[tag],
          createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: config[contentType].perPage,
          pathPrefix: `${contentType}/tags/${tag}`,
          context: {
            contentType,
            tag,
            tags: Object.keys(contentByTags)
          }
        });
      });
      if (contentType !== 'advice') {
        result.data[contentType].edges.forEach(e => {
          createPage({
            path: `${contentType}/${e.node.frontmatter.path}`,
            component: path.resolve('src/templates/content.js'),
            context: {
              data: e.node
            } // additional data can be passed via context
          });
        });
      }
    });
  });
};
