import React from 'react'
import Link from 'gatsby-link'
require('../../layouts/ui-elems.css');
require('./Sharing.css');

export default class Sharing extends React.Component {
	render() {
		return (
			<SocialSharing />
		)
	}
}

function SocialSharing() {
	return <div className='social-sharing'>
		<ul>
			<li>
				<a href="/">share in facebook</a>
			</li>
			<li>
				<a href="/">share to instagram</a>
			</li>
		</ul>
	</div>
}