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
              image_alt
              carousel_featured
              carousel_image
              carousel_image_alt
              list_image
              list_image_alt
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
              image_alt
              carousel_featured
              carousel_image
              carousel_image_alt
              list_image
              list_image_alt
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
              image_alt
              carousel_featured
              carousel_image
              carousel_image_alt
              list_image
              list_image_alt
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
      pages: allMarkdownRemark (filter: { frontmatter:  { contentType: { eq: "pages"}}}) {
        edges {
          node {
            html
            frontmatter {
              path
              title
              subtitle
              image
              image_alt
              carousel_featured
              carousel_image
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
    ['advice', 'articles', 'stories', 'sexoteca'].forEach(contentType => {
      const contentByTags = {};
      if (!result.data[contentType]) {
        return;
      }
      result.data[contentType].edges.forEach(e => {
        e.node.frontmatter.tags.forEach(tag => {
          if (!tag) {
            return;
          }
          if (contentByTags[tag]) {
            contentByTags[tag].push(e);
          } else {
            contentByTags[tag] = [e];
          }
        });
      });
      const settings = result.data[`${contentType}_settings`].edges[0].node.frontmatter;
      createPaginatedPages({
        edges: result.data[contentType].edges,
        createPage,
        pageTemplate: 'src/templates/index.js',
        pageLength: config[contentType].perPage,
        pathPrefix: contentType,
        context: {
          contentType,
          tags: Object.keys(contentByTags),
          settings: {
            title: settings.title,
            keywords: settings.metaKeywords,
            description: settings.metaDescription
          }
        }
      });
      Object.keys(contentByTags).forEach(tag => {
        const tagsSettings = Object.assign({}, result.data[`${contentType}_settings`].edges[0].node.frontmatter);
        Object.keys(tagsSettings).forEach(key => {
          tagsSettings[key] = tagsSettings[key].replace(/{{tag}}/gi, tag);
        });
        createPaginatedPages({
          edges: contentByTags[tag],
          createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: config[contentType].perPage,
          pathPrefix: `${contentType}/tags/${tag}`,
          context: {
            contentType,
            tag,
            tags: Object.keys(contentByTags),
            settings: Object.assign({}, result.data.settings.edges[0].node.frontmatter, {
              title: tagsSettings.tags_title,
              description: tagsSettings.tags_metaDescription,
              keywords: tagsSettings.tags_metaKeywords
            })
          }
        });
      });
      if (contentType !== 'advice') {
        result.data[contentType].edges.forEach(e => {
          createPage({
            path: `${contentType}/${e.node.frontmatter.path}`,
            component: path.resolve('src/templates/content.js'),
            context: {
              data: e.node,
              settings: Object.assign({}, result.data.settings.edges[0].node.frontmatter, {
                title: `${e.node.frontmatter.title}${result.data.settings.edges[0].node.frontmatter.titleTemplate}`,
                description: e.node.frontmatter.metaDescription,
                keywords: e.node.frontmatter.metaKeywords
              })
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
          settings: Object.assign({}, result.data.settings.edges[0].node.frontmatter, {
            title: `${e.node.frontmatter.title}${result.data.settings.edges[0].node.frontmatter.titleTemplate}`,
            description: e.node.frontmatter.metaDescription,
            keywords: e.node.frontmatter.metaKeywords
          })
        } // additional data can be passed via context
      });
    });

  });
};
