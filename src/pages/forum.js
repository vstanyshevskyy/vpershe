import React from 'react'
import Link from 'gatsby-link'
import ReactDisqusThread from 'react-disqus-thread';

export default class Forum extends React.Component {
	constructor() {
		super();
		this.state = {
			forumConfig: {
				shortname: "forumConfig",
				title: "Вперше - форум",
				url: "http://www.example.com/forum"
			},
			commentsHistory: []
		}
	}
	componentDidMount() {
		this.setState({
			commentsHistory: JSON.parse(localStorage.getItem('commentsHistory'))
		});
	}
	updateCommentsHistory() {
		let commentsHistory = null;
		if (!this.state.commentsHistory) {
			localStorage.setItem('commentsHistory', JSON.stringify(this.state.commentsHistory));
		} else{
			commentsHistory = JSON.parse(localStorage.getItem('commentsHistory'));
		}
	}
	handleNewComment(comment) {
		console.log(comment.text);
	}
	render() {
		return (
			<ReactDisqusThread
				shortname={this.state.forumConfig.shortname}
				identifier={this.state.forumConfig.shortname}
				title={this.state.forumConfig.title}
				url={this.state.forumConfig.url}
				category_id="123456"
				onNewComment={this.handleNewComment}/>
		);
	}
}
