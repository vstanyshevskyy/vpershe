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
	return (
		<div className='social-sharing'>
		<ul>
			<li>
				<a href="/">
					<i class="material-icons">face</i>
				</a>
			</li>
			<li>
				<a href="/">
					<i class="material-icons">insert_emoticon</i>
				</a>
			</li>
		</ul>
	</div>
	)
}