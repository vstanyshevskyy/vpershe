const path = require('path');
const config = require('./src/config');
const createPaginatedPages = require('gatsby-paginate');
const PATH_REPLACE_REGEX = /https?:\/\/(?:www.)?vpershe.(?:netlify.)?com\/(?:articles|stories|sexoteca)\//gi;

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
              list_image_articles
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
      homepageSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
        edges {
          node {
            frontmatter {
              contactFormEmail
              contactFormTitle
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const homePageSettings = result.data.homepageSettings.edges[0].node.frontmatter;
    const relatedContent = []
      .concat(result.data.articles.edges)
      .concat(result.data.stories.edges)
      .concat(result.data.sexoteca.edges);
    ['advice', 'articles', 'stories', 'sexoteca'].forEach(contentType => {
      const contentByTags = {};
      if (!result.data[contentType]) {
        return;
      }
      const contentItems = result.data[contentType].edges || [];
      contentItems.forEach(e => {
        e.node.frontmatter.related_sidebar = (e.node.frontmatter.related_sidebar || [])
          .map(({ path }) => {
            const filteredPath = path ? path.replace(PATH_REPLACE_REGEX, '') : path;
            const item = relatedContent.find(el => el.node.frontmatter.path === filteredPath);
            return item ? {
              url: `/${item.node.frontmatter.contentType}/${item.node.frontmatter.path}`,
              title: item.node.frontmatter.title
            } : null;
          }).filter(el => el);
        e.node.frontmatter.related_bottom = (e.node.frontmatter.related_bottom || [])
          .map(({ path }) => {
            const filteredPath = path ? path.replace(PATH_REPLACE_REGEX, '') : path;
            return relatedContent.find(el => el.node.frontmatter.path === filteredPath);
          })
          .filter(el => el);
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
        edges: contentItems,
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
                keywords: e.node.frontmatter.metaKeywords,
                contactFormEmail: homePageSettings.contactFormEmail
              })
            } // additional data can be passed via context
          });
        });
      }
    });
  });
};
