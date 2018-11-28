import React from 'react';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import { withPrefix } from 'gatsby-link';
import './index.less';

export default class Questionbox extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.keyboardToggle = this.keyboardToggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (!this.state.isOpen) {
      if (!window) {
        return;
      }
      window.scrollTo(0, 0);
    }
    if (this.props.onBoxToggle) {
      this.props.onBoxToggle();
    }
  }
  keyboardToggle(e) {
    if (e.charCode && e.charCode === 13) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }
  render() {
    const classes = classNames('questionbox', {
      'questionbox--open': this.state.isOpen
    });
    return (
      <div className={classes}>
        <div role="button" tabIndex="0" onKeyPress={this.keyboardToggle} onClick={this.toggle} className="questionbox__toggler" aria-label="Потрібна порада?">
          <div className="questionbox__toggler-text">Потрібна порада?</div>
          <img className="questionbox__toggle-icon" src={withPrefix('assets/chat.svg')} alt="" />
        </div>
        <form
          className="questionbox__form"
          action={`https://formspree.io/${this.props.email}`}
          method="POST"
        >
          <button className="questionbox__form-close" onKeyPress={this.keyboardToggle} onClick={this.toggle} type="button" ><FaClose /></button>
          <p className="questionbox__form-description">{this.props.title}</p>
          <label className="questionbox__form-label" htmlFor="form-contact">Email, щоб ти точно отримав відповідь</label>
          <input id="form-contact" className="questionbox__email-input" type="text" name="_replyto" placeholder="example@test.com" required />
          <label className="questionbox__form-label" htmlFor="form-message" >Тут ти можеш задати своє запитання, поділитись історією і запитати поради.:</label>
          <textarea className="questionbox__form-textarea" id="form-message" name="message" required placeholder="Тут ти можеш задати своє запитання, поділитись історією і запитати поради." />
          <input type="hidden" name="_language" value="uk" />
          <button className="btn questionbox__form-btn" type="submit">Надіслати</button>
        </form>
      </div>
    );
  }
}
