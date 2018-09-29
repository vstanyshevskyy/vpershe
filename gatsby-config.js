module.exports = {
  siteMetadata: {
    title: 'Vpershe Site'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
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
    }
  ]
};
