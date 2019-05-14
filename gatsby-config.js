module.exports = {
  siteMetadata: {
    title: 'Vpershe Site'
  },
  plugins: [
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
    'gatsby-plugin-offline'
  ]
};
