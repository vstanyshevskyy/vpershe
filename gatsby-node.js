const path = require('path');

const SKIP_TYPES = [
  'footer_settings',
  'navbar_settings'
];

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              image
              category
              tags
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const categories = [];
    const tags = [];
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (SKIP_TYPES.indexOf(node.frontmatter.contentType) > -1) {
        return;
      }
      if (categories.indexOf(node.frontmatter.category) === -1) {
        categories.push(node.frontmatter.category);
      }
      (node.frontmatter.tags || []).forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
      createPage({
        path: `${node.frontmatter.contentType}/${node.frontmatter.path}`,
        component: path.resolve(`src/templates/${node.frontmatter.contentType}/index.js`),
        context: {
          slug: node.frontmatter.path
        } // additional data can be passed via context
      });
    });
    categories.forEach(category => {
      createPage({
        path: `categories/${category}`,
        component: path.resolve('src/templates/categories-index.js'),
        context: {
          category
        }
      });
    });
    tags.forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: path.resolve('src/templates/tags-index.js'),
        context: {
          tag
        }
      });
    });
  });
};
