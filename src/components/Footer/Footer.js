import React from 'react';
import MessageSnippet from '../elements/messageSnippet';

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
			messageSuccessState: false,
			messageSuccess: {
				value: 'Ваше повідомлення успішно відправлено команді "Вперше"! Дякуємо.',
				type: 'action'
			},
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
		if (this.state.requestForm) {
			this.setState(() => {
				return {
					messageSuccessState: true
				}
			});
			setTimeout(() => {
				this.setState(() => {
					return {
						messageSuccessState: false
					}
				});
			}, 6000);
		}
	}
	handleChange(event, entityType) {
		const part = event.target.value;
		switch (entityType) {
			case 'topic': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: part,
							title: previous.requestForm.title,
							contactEmail: previous.requestForm.contactEmail,
							requestAdditions: previous.requestForm.requestAdditions
						}
					}
				});
				break;
			}
			case 'requestAdditions': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: previous.topic,
							title: previous.requestForm.title,
							contactEmail: previous.requestForm.contactEmail,
							requestAdditions: part
						}
					}
				});
				break;
			}
			case 'title': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: previous.requestForm.topic,
							title: part,
							contactEmail: previous.requestForm.contactEmail,
							requestAdditions: previous.requestForm.requestAdditions
						}
					}
				});
				break;
			}
			case 'contactEmail': {
				this.setState((previous) => {
					return {
						requestForm: {
							topic: previous.requestForm.topic,
							title: previous.requestForm.title,
							contactEmail: part,
							requestAdditions: previous.requestForm.requestAdditions
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
						<form name="requestUs" data-netlify="true" netlify-honeypot="bot-field" method="POST" action="https://formspree.io/your@email.com"
						      action="request successfully sended" netlify
						      onSubmit={this.handleSubmit} className='col-md-4 col-md-6 make-request'>
							<div>
								<h4>make request</h4>
							</div>
							<div className='form-group'>
								<input type="text" onChange={(e) => {this.handleChange(e, 'topic')}} value={this.state.requestForm.topic}
								       placeholder="request topic" className='form-control inpt-round' name="topic"/>
							</div>
							<div className='form-group'>
								<input type="text" onChange={(e) => {this.handleChange(e, 'title')}} value={this.state.requestForm.title}
								       placeholder="question title" className='form-control inpt-round' name="title"/>
							</div>
							<div className='form-group'>
								<input type="text" onChange={(e) => {this.handleChange(e, 'requestAdditions')}} value={this.state.requestForm.requestAdditions}
								       placeholder="request additions" className='form-control inpt-round' name="requestAdditions"/>
							</div>
							<div className='form-group'>
								<input type="email" onChange={(e) => {this.handleChange(e, 'contactEmail')}} value={this.state.requestForm.contactEmail}
								       placeholder="contact email" className='form-control inpt-round' name="contactEmail"/>
							</div>
							<button className='btn-round send-request-btn' style={fooStyles.btn}
							        value="submit">ask us or push important theme</button>
						</form>
					</div>
				</div>
				<MessageSnippet message={this.state.messageSuccess}/>
			</footer>
		)
	}
}
