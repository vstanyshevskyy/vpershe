import React from 'react';

const fooStyles = {
	foo: {
		marginTop: '40px',
		padding: '10px'
	},
	btn: {
		fontSize: '10px'
	}
};

export default class Footer extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<footer style={fooStyles.foo} className='footer'>
				<div className='container'>
					<div className='row'>
						<form className='col-md-4 col-md-6'>
							<div>
								<h4>Make Request</h4>
							</div>
							<div className='form-group'>
								<input type="text" className='form-control inpt-round' name="topic"/>
							</div>
							<div className='form-group'>
								<input type="text" className='form-control inpt-round' name="title"/>
							</div>
							<div className='form-group'>
								<input type="text" className='form-control inpt-round' name="additionals"/>
							</div>
							<button className='btn-round send-request-btn' style={fooStyles.btn} onClick={() => sendRequest()}>ask us or push important theme</button>
						</form>
					</div>
				</div>
			</footer>
		)
	}
}
