import React from 'react';
import Slider from '../components/Slider/Slider';
import ArticlesCategories from '../components/Categories/Categories';
import Modal from '../components/Modal/Modal';
import Header from '../components/Header';
import Feedback from '../components/Feedback/Feedback';

import {withPrefix} from 'gatsby-link'
import Link from 'gatsby-link'
import AvocadoTestImage from './images/avocado.png';
require('./pages.css');
require('./home-page.less');

require('../layouts/bootstrap/dist/css/bootstrap.css');

export const TEST_ARTICLES = [
];

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		TEST_ARTICLES.map(article => {
			article.more = false;
		});
		this.state = {
			articlesNews: TEST_ARTICLES,
			modalConfig: {
				id: "#about",
				title: "About Service",
				additionals: "Content here"
			}
		}
	}
	componentDidMount() {
		this.state.articlesNews ? this.state.articlesNews.map(news => {
			news.more = false;
		}) : false;
	}
	showLittleMore(param) {
		const index = this.state.articlesNews.map(function(e) { return e.name }).indexOf(param.name);
		if (!param.more) {
			this.state.articlesNews[index].more = true;
			this.setState(() => {
				return {
					articlesNews: this.state.articlesNews
				};
			});
		} else {
			this.state.articlesNews[index].more = false;
			this.setState(() => {
				return {
					articlesNews: this.state.articlesNews
				};
			});
		}
	}
	render() {
		const articles = (this.props.data.allMarkdownRemark.edges || []).map(a => {
			return {
				title: a.node.frontmatter.title,
				category: a.node.frontmatter.category,
				path: a.node.frontmatter.path,
				image: a.node.frontmatter.image,
			}
		});
		const avocadoStyle = {
			backgroundImage: `url(${AvocadoTestImage})`
		}
		return (
			<div className='container-fluid'>
				<Header />
				<Modal modalConfig={this.state.modalConfig}/>
				<div className='row'>
					<div className='col-md-4'>
						<h2>Фан</h2>
						<Link to="/avocado-test/" className='col-md-12 avocado-item' style={avocadoStyle}>
						</Link>
					</div>
					<div className='col-md-8'>
						<h2>Останні дописи</h2>
						<div className='container-fluid article-preview'>
							{articles !== null ?
								<div className='row articles-wrapper' style={({width: 320 * articles.length})}>
									{articles.map((item, index) => {
										const style = {
											backgroundImage: `url(${withPrefix(item.image)})`
										}
										return (
											<div style={style} className={item.more? 'col-md-4 col-sm-12 article-item no-overflow' : 'col-md-4 article-item'} key={index}>

												<h5 className='article-item-title'><Link to={`/articles/${item.path}`}>{item.title}
												</Link></h5>
											</div>
										)
									})}
								</div> :
								<div className='col-md-4'>Empty News</div>
							}
						</div>
					</div>
				</div>
				<Feedback />
			</div>
		)
	}
}

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
