import React from 'react';
import Link from 'gatsby-link';
import Slider from '../../components/Slider/Slider';
import ArticlesCategories from '../../components/Categories/Categories';
import Modal from '../../components/Modal/Modal';
import Header from '../../components/Header';
import Feedback from '../../components/Feedback/Feedback';
import AvocadoTestImage from '../../pages/images/avocado.png';

export default class HomeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: props.articles || [],
			modalConfig: {
				id: '#about',
				title: 'About Service',
				additionals: 'Content here'
			}
		}
	}
	componentDidMount() {
		this.state.articles ? this.state.articles.map(news => {
			news.more = false;
		}) : false;
	}
	showLittleMore(param) {
		const index = this.state.articles.map(function(e) { return e.title }).indexOf(param.title);
		if (!param.more) {
			this.state.articles[index].more = true;
			this.setState(() => {
				return {
					articles: this.state.articles
				};
			});
		} else {
			this.state.articles[index].more = false;
			this.setState(() => {
				return {
					articles: this.state.articles
				};
			});
		}
	}
	render() {
		return (
			<div className='container-fluid'>
				<Header />
				<Modal modalConfig={this.state.modalConfig}/>
				<Slider articles={this.state.articles}/>
				<div className='row'>
					<div className='col-md-10'>
						<h2>Останні дописи</h2>
						<Articles articles={this.state.articles}/>
					</div>
				</div>
				<ArticlesCategories />
				<Feedback />
			</div>
		)
	}
};

const Articles = (props) => {
	const avocadoStyle = {
		backgroundImage: `url(${AvocadoTestImage})`
	};
	return (
		<div className='row'>
			{props.articles.length > 0 ?
				<div>
					{props.articles.map(t => {
						return (
							<div className='col-md-4 col-sm-6 article-card'>
								<h4>{t.title}</h4>
								<img src={t.image}/>
								<p>{t.category}</p>
							</div>
						)
					})}
					<div className='col-md-4'>
						<div className='container'>
							<Link to="/avocado-test/" className='col-md-12 avocado-item' style={avocadoStyle}></Link>
						</div>
					</div>
				</div> : <div>Articles length is 0</div>
			}
		</div>
	)
};
