const path = require('path');
const createPaginatedPages = require('gatsby-paginate');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

// exports.onCreateNode = ({ node }) => {
//   fmImagesToRelative(node);
// };
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

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//   const { createNodeField } = boundActionCreators;
//   if (node.internal.type === 'MarkdownRemark') {
//     console.log(Object.keys(node.frontmatter));
//     if (node.frontmatter && node.frontmatter.image) {
//       node.frontmatter = {
//         ...node.frontmatter,
//         imageFile: createFilePath({ node, getNode })
//       }
//     }
//     // const value = createFilePath({ node, getNode });
//     // createNodeField({
//     //   name: 'slug',
//     //   node,
//     //   value
//     // });
//   }
// };

const prepareRelatedContent = (input, allContent) => {
  const PATH_REPLACE_REGEX = /https?:\/\/(?:www.)?vpershe.(?:netlify.)?com\/(?:articles|stories|sexoteca)\//gi;
  return (input || [])
    .map(({ path }) => {
      if (!path) {
        return null;
      }
      const filteredPath = path.replace(PATH_REPLACE_REGEX, '');
      const item = allContent.find(content => content.path === filteredPath);
      return item;
    }).filter(el => el);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      articles: allMarkdownRemark (
        filter: { frontmatter:  { contentType: { eq: "articles" } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
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
              }
              image_alt
              carousel_featured
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
              related_sidebar {
                path
              }
              related_bottom {
                path
              }
            }
          }
        }
      }
      stories: allMarkdownRemark (
        filter: { frontmatter:  { contentType: { eq: "stories" } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
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
              }
              image_alt
              carousel_featured
              carousel_image {
                relativePath
              }
              carousel_image_alt
              list_image {
                relativePath
              }
              list_image_alt
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
              related_sidebar {
                path
              }
              related_bottom {
                path
              }
            }
          }
        }
      }
      sexoteca: allMarkdownRemark (
        filter: { frontmatter:  { contentType: { eq: "sexoteca" } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
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
              }
              image_alt
              carousel_featured
              carousel_image  {
                relativePath
              }
              carousel_image_alt
              list_image {
                relativePath
              }
              list_image_alt
              tags
              publishTime
              metaKeywords
              metaDescription
              contentType
              related_sidebar {
                path
              }
              related_bottom {
                path
              }
            }
          }
        }
      }
      advice: allMarkdownRemark (
        filter: { frontmatter:  { contentType: { eq: "advice" } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
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
      pages: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "pages"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              title
              subtitle
              image {
                relativePath
              }
              image_alt
              carousel_featured
              carousel_image  {
                relativePath
              }
              carousel_image_alt
              publishTime
              metaKeywords
              metaDescription
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
              favicon  {
                relativePath
              }
              metaDescription
              metaKeywords
              fbTitle
              fbImage  {
                relativePath
              }
              fbDescription
            }
          }
        }
      }
      advice_settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "advice_settings"}}}) {
        edges {
          node {
            frontmatter {
              contentType
              title
              metaDescription
              metaKeywords
              tags_title
              tags_metaDescription
              tags_metaKeywords
            }
          }
        }
      }
      stories_settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "stories_settings"}}}) {
        edges {
          node {
            frontmatter {
              contentType
              title
              metaDescription
              metaKeywords
              tags_title
              tags_metaDescription
              tags_metaKeywords
            }
          }
        }
      }
      articles_settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "articles_settings"}}}) {
        edges {
          node {
            frontmatter {
              contentType
              title
              metaDescription
              metaKeywords
              tags_title
              tags_metaDescription
              tags_metaKeywords
            }
          }
        }
      }
      sexoteca_settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "sexoteca_settings"}}}) {
        edges {
          node {
            frontmatter {
              contentType
              title
              metaDescription
              metaKeywords
              tags_title
              tags_metaDescription
              tags_metaKeywords
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const globalSettings = result.data.settings.edges[0].node.frontmatter;
    const relatedContent = []
      .concat(result.data.articles.edges)
      .concat(result.data.stories.edges)
      .concat(result.data.sexoteca.edges)
      .map(c => c.node.frontmatter);
    ['advice', 'articles', 'stories', 'sexoteca'].forEach(contentType => {
      if (!result.data[contentType]) {
        return;
      }
      const contentByTags = {};
      const contentItems = result.data[contentType].edges || [];
      const settings = result.data[`${contentType}_settings`].edges[0].node.frontmatter;
      contentItems.forEach(e => {
        e.node.frontmatter = Object.assign({}, e.node.frontmatter, {
          related_sidebar: prepareRelatedContent(e.node.frontmatter.related_sidebar, relatedContent),
          related_bottom: prepareRelatedContent(e.node.frontmatter.related_bottom, relatedContent)
        });
        e.node.frontmatter.tags.forEach(tag => {
          if (!tag) {
            return;
          }
          contentByTags[tag] = (contentByTags[tag] || []).concat(e);
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
            tags: contentTypeTags,
            settings: {
              title: settings.title,
              keywords: settings.metaKeywords,
              description: settings.metaDescription
            },
            globalSettings
          }
        });
      });
      // createPaginatedPages({
      //   edges: contentItems,
      //   createPage,
      //   pageTemplate: `src/templates/${template}ListPage.js`,
      //   pageLength: config[contentType].perPage,
      //   pathPrefix: contentType,
      //   context: {
      //     contentType,
      //     tags: contentTypeTags,
      //     settings: {
      //       title: settings.title,
      //       keywords: settings.metaKeywords,
      //       description: settings.metaDescription
      //     },
      //     globalSettings
      //   }
      // });
      contentTypeTags.forEach(tag => {
        Object.keys(settings).forEach(key => {
          settings[key] = settings[key].replace(/{{tag}}/gi, tag);
        });
        // createPaginatedPages({
        //   edges: contentByTags[tag],
        //   createPage,
        //   pageTemplate: `src/templates/${template}ListPage.js`,
        //   pageLength: config[contentType].perPage,
        //   pathPrefix: `${contentType}/tags/${tag}`,
        //   context: {
        //     contentType,
        //     tag,
        //     tags: Object.keys(contentByTags),
        //     settings: Object.assign({}, globalSettings, {
        //       title: settings.tags_title,
        //       description: settings.tags_metaDescription,
        //       keywords: settings.tags_metaKeywords
        //     }),
        //     globalSettings
        //   }
        // });
      });
      if (contentType !== 'advice') {
        result.data[contentType].edges.forEach(e => {
          const url = `${contentType}/${e.node.frontmatter.path}`;
          createPage({
            path: url,
            component: path.resolve('src/templates/content.js'),
            context: {
              data: e.node,
              settings: Object.assign({}, globalSettings, {
                url,
                title: `${e.node.frontmatter.title}`,
                description: e.node.frontmatter.metaDescription,
                keywords: e.node.frontmatter.metaKeywords
              }),
              globalSettings
            } // additional data can be passed via context
          });
        });
      }
    });
    result.data.pages.edges.forEach(e => {
      createPage({
        path: e.node.frontmatter.path,
        component: path.resolve('src/templates/content.js'),
        context: {
          data: e.node,
          settings: Object.assign({}, globalSettings, {
            title: `${e.node.frontmatter.title}${globalSettings.titleTemplate}`,
            description: e.node.frontmatter.metaDescription,
            keywords: e.node.frontmatter.metaKeywords
          })
        } // additional data can be passed via context
      });
    });
  });
};
