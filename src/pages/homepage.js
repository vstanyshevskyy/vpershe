import React from 'react';
import Slider from '../components/Slider/Slider';
import ArticlesCategories from '../components/Categories/Categories';
import Modal from '../components/Modal/Modal';
require('./pages.css');

export const TEST_ARTICLES = [
	{
		name: 'Blog',
		label: 'Articles',
		folder: "content/articles",
		fields: [
			{label: "Url", name: "path", widget: "string"},
			{label: "Заголовок", name: "title", widget: "string"},
			{label: "Категорія", name: "category", widget: "string"},
			{
				label: "Теги", content: {
					name: "tags",
					widget: "list",
					default: ["статті", "едукація"]
				}
			},
			{
				label: "Текст",
				name: "body",
				widget: "markdown"
			},
			{
				label: "Час публікації",
				name: "publishTime",
				widget: "datetime"
			}
		]
	},
	{
		name: 'Blog2',
		label: 'Articles',
		folder: "content/articles",
		fields: [
			{label: "Url", name: "path", widget: "string"},
			{label: "Заголовок", name: "title", widget: "string"},
			{label: "Категорія", name: "category", widget: "string"},
			{
				label: "Теги", content: {
					name: "tags",
					widget: "list",
					default: ["статті", "едукація"]
				}
			},
			{
				label: "Текст",
				name: "body",
				widget: "markdown"
			},
			{
				label: "Час публікації",
				name: "publishTime",
				widget: "datetime"
			}
		]
	},
	{
		name: 'Blog2',
		label: 'Articles',
		folder: "content/articles",
		fields: [
			{label: "Url", name: "path", widget: "string"},
			{label: "Заголовок", name: "title", widget: "string"},
			{label: "Категорія", name: "category", widget: "string"},
			{
				label: "Теги", content: {
					name: "tags",
					widget: "list",
					default: ["статті", "едукація"]
				}
			},
			{
				label: "Текст",
				name: "body",
				widget: "markdown"
			},
			{
				label: "Час публікації",
				name: "publishTime",
				widget: "datetime"
			}
		]
	}
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
		return (
			<div className='container-fluid'>
				<Modal modalConfig={this.state.modalConfig}/>
				<div className='row'>
					<div className='col-md-12'>
						<Slider />
					</div>
					<div className='col-md-12'>
						<div className='container-fluid article-preview'>
							{this.state.articlesNews !== null ?
								<div className='row'>
									{this.state.articlesNews.map((item, index) => {
										return (
											<div className={item.more? 'col-md-4 col-sm-12 article-item no-overflow' : 'col-md-4 article-item'} key={index}>
												<h5 className='article-item-title'>{item.name}</h5>
												<p>{item.more}</p>
												<blockquote>
													{item.fields.map((field, index)  => {
														return (
															<div key={index}>
																<p>{field.label}</p> &
																<p>{field.name}</p>
															</div>
														)
													})}
												</blockquote>
												<button className='show-more-btn btn-round' onClick={() => {this.showLittleMore(item)}}>show more</button>
											</div>
										)
									})}
								</div> :
								<div className='col-md-4'>Empty News</div>
							}
						</div>
					</div>
					<div className='col-md-12'>
						<ArticlesCategories />
					</div>
				</div>
			</div>
		)
	}
}
