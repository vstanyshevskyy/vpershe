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
        filter: { frontmatter:  { contentType: { in: ["articles", "stories", "sexoteca", "advice"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              path
              title
              tags
            }
          }
        }
      }
      pages: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "pages"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              contentType
            }
          }
        }
      }
      games: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "games"}}}) {
        edges {
          node {
            frontmatter {
              path
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
    result.data.posts.edges.forEach(({ node: { frontmatter: post }}) => {
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
      const template = contentType === 'advice' ? 'advice' : 'articles';

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
      if (contentType !== 'advice') {
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
      }
    });
    result.data.pages.edges.forEach(e => {
      createPage({
        path: e.node.frontmatter.path,
        component: path.resolve('src/templates/content.js'),
        context: {
          contentType: e.node.frontmatter.contentType,
          slug: e.node.frontmatter.path
        }
      });
    });
    result.data.games.edges.forEach(({ node: { frontmatter: { path: slug } } }) => {
      createPage({
        path: `games/${slug}`,
        component: path.resolve('src/templates/games/index.js'),
        context: {
          slug
        }
      });
    });
  });
};
