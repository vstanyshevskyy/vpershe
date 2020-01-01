const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Vpershe Site',
    siteUrl: 'https://vpershe.com'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/assets`
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-KMZ98TT',
        includeInDevelopment: true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/content`,
        name: 'content'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/advice`,
        name: 'advice'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: `${__dirname}/content/settings/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'games',
        path: `${__dirname}/content/games`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Vpershe',
        short_name: 'Vpershe',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#fff',
        display: 'standalone',
        icon: 'static/assets/icon-512px.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images'
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 930,
              backgroundColor: 'transparent' // required to display blurred image first
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{
          userAgent: '*',
          allow: '/',
          disallow: '/tags'
        }]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
  
            posts: allMarkdownRemark (
              filter: { frontmatter:  { contentType: { in: ["articles", "stories", "sexoteca"] } } }
            ) {
              edges {
                node {
                  frontmatter {
                    contentType
                    path
                  }
                }
              }
            }

            pages: allMarkdownRemark (
              filter: { frontmatter:  { contentType: { in: ["pages"] } } }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }

            advice: allMarkdownRemark (
              filter: { frontmatter:  { contentType: { in: ["advice"] } } }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
        }`,
        serialize: ({
          site: { siteMetadata: { siteUrl } },
          posts: { edges: posts },
          pages: { edges: pages },
          advice: { edges: advice }
        }) => {
          const counters = {
            advice: advice.length
          };
          let result = [{
            url: siteUrl,
            changefreq: 'daily',
            priority: 0.8
          },
          {
            url: `${siteUrl}/team`,
            changefreq: 'daily',
            priority: 0.8
          }];
          result = result.concat(pages.map(({ node: { frontmatter: { path } } }) => ({
            url: `${siteUrl}/${path}`,
            changefreq: 'weekly',
            priority: 0.6
          })));
          result = result.concat(posts.map(({ node: { frontmatter: { path, contentType } } }) => {
            counters[contentType] = counters[contentType] ? counters[contentType] + 1 : 1;
            return {
              url: `${siteUrl}/${contentType}/${path}`,
              changefreq: 'daily',
              priority: 0.7
            };
          }));
          Object.keys(counters).forEach(type => {
            const postsPerPage = config[type].perPage;
            const numPages = Math.ceil(counters[type] / postsPerPage);
            Array.from({ length: numPages }).forEach((_, i) => {
              result.push({
                url: `${siteUrl}/${type}${i ? `/${i + 1}` : ''}`,
                changefreq: 'daily',
                priority: 0.9
              });
            });
          });
          return result;
        }
      }
    }
  ]
};
