import React from 'react'
import Link from 'gatsby-link'
require('./Nav.css');

export default class NavBar extends React.Component {
	constructor(props) {
		super();
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
			]
		}
	}
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">Vpershe</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
						{this.state.links.map(link => {
							return (
								<li key={link.href} to={link.href} className={link.active?  + 'nav-item' : 'nav-item'}>
									<Link to="/page-2/">{link.title}</Link>
								</li>
							)
						})}
						</ul>
						<form className="form-inline my-2 my-lg-0">
							<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
						</form>
					</div>
					<a className='brand-logotype'>Vpershe</a>
				</nav>
			</div>
		)
	}
}
