import React from 'react';

export default class Footer extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<footer className='footer'>
				<div className='container'>
					<h4>Make Request</h4>
					<form className='form-group'>
						<div className='form-control'>
							<input type="text" name="topic"/>
						</div>
						<div className='form-control'>
							<input type="text" name="title"/>
						</div>
						<div className='form-control'>
							<input type="text" name="additionals"/>
						</div>
						<button>ask us or push important theme</button>
					</form>
				</div>
			</footer>
		)
	}
}
