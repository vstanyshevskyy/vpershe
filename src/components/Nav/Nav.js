import React from 'react'
import Link from 'gatsby-link'
require('./Nav.css');
import TEST_ARTICLES from '../../pages/homepage';
export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeLink: null,
			links: [
				{
					title: 'Home',
					href: '/home',
					active: false
				},
				{
					title: 'About',
					href: '#about',
					active: false
				},
				{
					title: 'FAQ',
					href: '#faq',
					active: false
				}
			],
			articlesNews: TEST_ARTICLES,
			searchResults: {
				values: [],
				state: false
			}
		};
		this.activateSearch = this.activateSearch.bind(this);
	}
	activateSearch(value) {
		const results = [];
		this.state.articlesNews.map(news => {
			if (news.name.match(value)) {
				results.push(value);
			}
		});
		this.setState(() => {
			return {
				searchResults: {
					state: true,
					values: results
				}
			}
		})
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						{this.state.links.map(link => {
							return (
								<li key={link.href} className={link.active?  + 'nav-item' : 'nav-item'}>
									<Link to={link.href}>{link.title}</Link>
								</li>
							)
						})}
						<li className='brand-area'>
							<a href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
							   className="navbar-brand" href="#">Vpershe</a>
							<span className="navbar-toggler-icon"></span>
						</li>
					</ul>
					<div className='start-search'>
						<form className="form-inline">
							<input onKeyPress={(e) => {this.activateSearch(searchValue.value)}}
							       id="searchValue" className="inpt-round form-control" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn-round btn btn-outline-success" type="submit">Search</button>
						</form>
						{this.state.searchResults.state?
							<div className='search-results'>
								<div className='row'>
									<div className='col-md-12'>
										<ul>
											{this.state.searchResults.values.map((val, index) => {
												return (
													<li key={index}>{val.name}</li>
												)
											})}
										</ul>
									</div>
								</div>
							</div> :
							false
						}
					</div>
				</div>
			</nav>
		)
	}
}
