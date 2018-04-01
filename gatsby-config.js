module.exports = {
	siteMetadata: {
		title: 'Vpershe Site',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-netlify-cms',
		'gatsby-remark-responsive-iframe',
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/articles`,
				name: 'articles',
			},
		}
	],
};
