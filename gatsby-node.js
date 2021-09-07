const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const config = require('./src/config');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      posts: allMarkdownRemark (
        filter: { frontmatter:  { contentType: { in: ["articles", "stories", "sexoteca"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              path
              tags
            }
          }
        }
      }
      pages: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "pages"}}}) {
        edges {
          node {
            frontmatter {
              path
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
    const postsGroupedByType = {};
    const { data: { posts: { edges: posts }, pages: { edges: pages } } } = result;
    posts.forEach(({ node: { frontmatter: post } }) => {
      const { contentType } = post;
      postsGroupedByType[contentType] = postsGroupedByType[contentType] || [];
      postsGroupedByType[contentType].push(post);
    });
    Object.keys(postsGroupedByType).forEach(contentType => {
      const contentByTags = {};
      const contentItems = postsGroupedByType[contentType];
      contentItems.forEach(post => {
        post.tags.forEach(tag => {
          if (!tag) {
            return;
          }
          contentByTags[tag] = (contentByTags[tag] || []).concat(post);
        });
      });
      const contentTypeTags = Object.keys(contentByTags);
      const template = 'articles';

      const postsPerPage = config[contentType].perPage;
      const numPages = Math.ceil(contentItems.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/${contentType}${i ? `/${i + 1}` : ''}`,
          component: path.resolve(`./src/templates/${template}ListPage.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            contentType,
            tags: contentTypeTags
          }
        });
      });
      contentTypeTags.forEach(tag => {
        const numTagPages = Math.ceil(contentByTags[tag].length / postsPerPage);
        Array.from({ length: numTagPages }).forEach((_, i) => {
          createPage({
            path: `/${contentType}/tags/${tag}${i ? `/${i + 1}` : ''}`,
            component: path.resolve(`./src/templates/${template}TagListPage.js`),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numTagPages,
              tag,
              tags: Object.keys(contentByTags),
              currentPage: i + 1,
              contentType
            }
          });
        });
      });
      contentItems.forEach(({ path: pagePath }) => {
        const url = `${contentType}/${pagePath}`;
        createPage({
          path: url,
          component: path.resolve('src/templates/content.js'),
          context: {
            contentType,
            slug: pagePath
          }
        });
      });
    });
    pages.forEach(({ node: { frontmatter: { path: pagePath, contentType } } }) => {
      createPage({
        path: pagePath,
        component: path.resolve('src/templates/content.js'),
        context: {
          contentType,
          slug: pagePath
        }
      });
    });
  });
};
