import React from 'react'
import Link from 'gatsby-link'

export default class FAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="container-fluid">
				<div>
					<h4>FAQ</h4>
					<div className="panel-group">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" href="#collapse1">people what we help</a>
								</h4>
							</div>
							<div id="collapse1" className="panel-collapse collapse">
								<div className="panel-body">some text</div>
								<div className="panel-footer">some text</div>
							</div>
						</div>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" href="#collapse1">people what we help 1</a>
								</h4>
							</div>
							<div id="collapse1" className="panel-collapse collapse">
								<div className="panel-body">some text</div>
								<div className="panel-footer">some text</div>
							</div>
						</div>
						<div className="panel panel-default">
							<div className="panel-heading">
								<h4 className="panel-title">
									<a data-toggle="collapse" href="#collapse1">people what we help 2</a>
								</h4>
							</div>
							<div id="collapse1" className="panel-collapse collapse">
								<div className="panel-body">some text</div>
								<div className="panel-footer">some text</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
