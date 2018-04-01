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
	constructor(props) {
		super(props);
		this.state = {
			requestForm: {
				title: '',
				topic: '',
				contactEmail: ''
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.requestForm);
	}
	handleChange(event, entityType) {
		const part = event.target.value;
		console.log(part);
		switch (entityType) {
			case 'topic': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: part,
							title: previous.title,
							contactEmail: previous.contactEmail
						}
					}
				});
				break;
			}
			case 'title': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: previous.topic,
							title: part,
							contactEmail: previous.contactEmail
						}
					}
				});
				break;
			}
			case 'contactEmail': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: previous.topic,
							title: previous.title,
							contactEmail: part
						}
					}
				});
				break;
			}
		}
	}
	render() {
		return (
			<footer style={fooStyles.foo} className='footer'>
				<div className='container'>
					<div className='row'>
						<form onSubmit={this.handleSubmit} className='col-md-4 col-md-6'>
							<div>
								<h4>make request</h4>
							</div>
							<div className='form-group'>
								<input type="text" onChange={(e) => {this.handleChange(e, 'topic')}} value={this.state.requestForm.topic} className='form-control inpt-round'/>
							</div>
							<div className='form-group'>
								<input type="text" onChange={(e) => {this.handleChange(e, 'title')}} value={this.state.requestForm.title} className='form-control inpt-round'/>
							</div>
							<div className='form-group'>
								<input type="email" onChange={(e) => {this.handleChange(e, 'contactEmail')}} value={this.state.requestForm.contactEmail} className='form-control inpt-round'/>
							</div>
							<button className='btn-round send-request-btn' style={fooStyles.btn}
							        value="submit">ask us or push important theme</button>
						</form>
					</div>
				</div>
			</footer>
		)
	}
}
