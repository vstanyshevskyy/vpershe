const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const config = require('./src/config');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);

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
        filter: { frontmatter:  { contentType: { eq: "post" } } }
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
    const postsGroupedByCategory = {};
    const { data: { posts: { edges: posts }, pages: { edges: pages } } } = result;
    posts.forEach(({ node: { frontmatter: post } }) => {
      const { category } = post;
      postsGroupedByCategory[category] = postsGroupedByCategory[category] || [];
      postsGroupedByCategory[category].push(post);
    });
    Object.keys(postsGroupedByCategory).forEach(category => {
      const contentByTags = {};
      const contentItems = postsGroupedByCategory[category];
      contentItems.forEach(post => {
        post.tags.forEach(tag => {
          if (!tag) {
            return;
          }
          contentByTags[tag] = (contentByTags[tag] || []).concat(post);
        });
      });
      const categoryTags = Object.keys(contentByTags);
      const template = 'articles';

      const postsPerPage = 10;
      const numPages = Math.ceil(contentItems.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/${category}${i ? `/${i + 1}` : ''}`,
          component: path.resolve(`./src/templates/${template}ListPage.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            contentType: category, //!!!!
            tags: categoryTags
          }
        });
      });
      categoryTags.forEach(tag => {
        const numTagPages = Math.ceil(contentByTags[tag].length / postsPerPage);
        Array.from({ length: numTagPages }).forEach((_, i) => {
          createPage({
            path: `/${category}/tags/${tag}${i ? `/${i + 1}` : ''}`,
            component: path.resolve(`./src/templates/${template}TagListPage.js`),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numTagPages,
              tag,
              tags: Object.keys(contentByTags),
              currentPage: i + 1,
              contentType: category//!!!!!
            }
          });
        });
      });
      contentItems.forEach(({ path: pagePath }) => {
        const url = `${category}/${pagePath}`;
        createPage({
          path: url,
          component: path.resolve('src/templates/content.js'),
          context: {
            contentType: category,//!!!!!
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
