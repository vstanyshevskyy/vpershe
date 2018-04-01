import React from 'react'
import TEST_ARTICLES from '../../pages/homepage';
import { articleCategories } from '../../store/categories';

const categoriesStyles = {
	box: {
		marginTop: '40px'
	},
	btn: {
		padding: '12px 10px !important',
		border: '1px solid coral',
		position: 'relative',
		margin: '8px',
		backgroundColor: 'whitesmoke',
		color: 'gray',
		top: '20px',
		opacity: '.8',
		minHeight: '68px',
		width: '172px'
	}
};

export default class ArticlesCategories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: articleCategories || [],
			activeCategory: null,
			articlesNews: TEST_ARTICLES
		};
	}
	exploreAllCategories() {
		window.location.assign('/categories');
	}
	render() {
		return (
			<div style={categoriesStyles.box} className='container-fluid category-cards'>
				<div className='row'>
					{this.state.categories.map((category, index) => {
						return (
							<div key={index} className={'col-md-3 col-sm-6 category-card'}>
								<img src={category.imgUrl} />
								{category.title}
							</div>
						)
					})}
				</div>
				<div className='row'>
					<button className='btn-round btn' style={categoriesStyles.btn} onClick={this.exploreAllCategories}>explore all categories</button>
				</div>
			</div>
		)
	}
}
