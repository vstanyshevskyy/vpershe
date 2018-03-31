import React from 'react'
import Link from 'gatsby-link'
require('./Nav.css');
import TEST_ARTICLES from '../../pages/homepage';

export default class NewsCategories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			activeCategory: null,
			articlesNews: TEST_ARTICLES
		};
	}
	render() {
		return (
			<div className='container-fluid category-cards'>
				<div className='row'>
					{this.state.categories.map(category => {
						return (
							<div className={'col-md-3 col-sm-6 category-card'}>
								{category.title}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
