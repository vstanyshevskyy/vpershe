module.exports = {
  siteMetadata: {
    title: 'Vpershe Site'
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
    'gatsby-remark-responsive-iframe',
    'gatsby-transformer-remark',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles`,
        name: 'articles'
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
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        hostname: 'string',
        listId: 'string',
        settings: 'object'
      }
    }
  ]
};
