import React from 'react';
import MessageSnippet from '../elements/messageSnippet';

const fooStyles = {
  foo: {
    marginTop: '40px',
    padding: '10px',
    width: '100%'
  },
  btn: {
    fontSize: '10px'
  }
};

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // messageSuccessState: false,
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
      this.setState(() => ({
        messageSuccessState: true
      }));
      setTimeout(() => {
        this.setState(() => ({
          messageSuccessState: false
        }));
      }, 6000);
    }
  }
  handleChange(event, entityType) {
    const part = event.target.value;

    switch (entityType) {
    case 'topic':
      this.setState(previous => ({
        requestForm: {
          topic: part,
          title: previous.requestForm.title,
          contactEmail: previous.requestForm.contactEmail,
          requestAdditions: previous.requestForm.requestAdditions
        }
      }));
      break;
    case 'requestAdditions':
      this.setState(previous => ({
        requestForm: {
          topic: previous.topic,
          title: previous.requestForm.title,
          contactEmail: previous.requestForm.contactEmail,
          requestAdditions: part
        }
      }));
      break;
    case 'title':
      this.setState(previous => ({
        requestForm: {
          topic: previous.requestForm.topic,
          title: part,
          contactEmail: previous.requestForm.contactEmail,
          requestAdditions: previous.requestForm.requestAdditions
        }
      }));
      break;
    case 'contactEmail':
      this.setState(previous => ({
        requestForm: {
          topic: previous.requestForm.topic,
          title: previous.requestForm.title,
          contactEmail: part,
          requestAdditions: previous.requestForm.requestAdditions
        }
      }));
      break;
    default:
      break;
    }
  }
  render() {
    return (
      <footer style={fooStyles.foo} className="text-center col-xs-12">
        <div className="container">
          <div className="row">
            <form
              name="requestUs"
              data-netlify="true"
              netlify-honeypot="bot-field"
              method="POST"
              action="https://formspree.io/your@email.com"
              netlify
              onSubmit={this.handleSubmit}
              className="col-md-4 col-md-6 make-request"
            >
              <div>
                <h4>Форма зворотнього зв&apos;язку</h4>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={e => { this.handleChange(e, 'topic'); }}
                  value={this.state.requestForm.topic}
                  placeholder="Тема"
                  className="form-control inpt-round"
                  name="topic"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={e => { this.handleChange(e, 'title'); }}
                  value={this.state.requestForm.title}
                  placeholder="Питання"
                  className="form-control inpt-round"
                  name="title"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={e => { this.handleChange(e, 'requestAdditions'); }}
                  value={this.state.requestForm.requestAdditions}
                  placeholder="Додаткові дані"
                  className="form-control inpt-round"
                  name="requestAdditions"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  onChange={e => { this.handleChange(e, 'contactEmail'); }}
                  value={this.state.requestForm.contactEmail}
                  placeholder="Контактна адреса"
                  className="form-control inpt-round"
                  name="contactEmail"
                />
              </div>
              <button
                className="btn-lg btn-default"
                style={fooStyles.btn}
                value="submit"
              >Надіслати
              </button>
            </form>
          </div>
        </div>
        <MessageSnippet message={this.state.messageSuccess} />
      </footer>
    );
  }
}
