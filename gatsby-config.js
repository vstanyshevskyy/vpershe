module.exports = {
	siteMetadata: {
		title: 'Vpershe Site',
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
		{
			resolve: 'gatsby-plugin-mailchimp',
			options: {
				hostname: 'string',
				listId: 'string',
				settings: 'object'
			}
		}
	],
};
