import React from 'react';
import Home from '../components/Home/Home';
require('./pages.css');
require('./home-page.less');
require('../layouts/bootstrap/dist/css/bootstrap.css');

const IndexPage = (props) => {
	const articles = (props.data.allMarkdownRemark.edges || []).map(a => {
		return {
			title: a.node.frontmatter.title,
			category: a.node.frontmatter.category,
			path: a.node.frontmatter.path,
			image: a.node.frontmatter.image,
		}
	});
	return (
		<Home articles={articles}/>
	)
};

export const pageQuery = graphql`
query Articles {
	allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "articles"} }}){
		edges{
		 node{
			 frontmatter{
				 title
				 category
				 path
				 image
				 publishTime
				 contentType
			 }
		 }
		}
	}
}
`

export default IndexPage;