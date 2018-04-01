const React = require('react');
import $ from 'jquery';
require('./elements.css');

export default class ScrollTop extends React.Component {
	constructor(props) {
		super(props);
	}
	clickTop() {
		$(document).ready(function() {
			$('html, body').animate({
				scrollTop: $("#brand").offset().top
			}, 1800);
		})
	}
	render() {
		return (
			<div onClick={this.clickTop} className='btn-scroll-top shadow-card'>
				<span>To Top</span>
				<i className="material-icons">vertical_align_top</i>
			</div>
		)
	}
}
