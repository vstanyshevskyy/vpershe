module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles`,
        name: 'articles',
      },
    },
  ],
};
