import React from 'react';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import { withPrefix } from 'gatsby-link';
import './index.less';

export default class Feedback extends React.Component {
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
  }
  keyboardToggle(e) {
    if (e.charCode && e.charCode === 13) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }
  render() {
    const classes = classNames('feedback', {
      'feedback--open': this.state.isOpen
    });
    return (
      <div className={classes}>
        <div role="button" tabIndex="0" onKeyPress={this.keyboardToggle} onClick={this.toggle} className="feedback__toggler" aria-label="Потрібна порада?">
          <div className="feedback__toggler-text">Потрібна порада?</div>
          <img className="feedback__toggle-icon" src={withPrefix('assets/chat.svg')} alt="" />
        </div>
        <div role="none" className="form__fader" onClick={this.toggle} />
        <form
          className="feedback__form"
          action={`https://formspree.io/${this.props.email}`}
          method="POST"
        >
          <button className="feedback__form-close" onKeyPress={this.keyboardToggle} onClick={this.toggle} type="button" ><FaClose /></button>
          <p className="feedback__form-description">{this.props.title}</p>
          <label className="feedback__form-label" htmlFor="form-contact">Email, щоб ти точно отримав відповідь</label>
          <input id="form-contact" className="feedback__email-input" type="text" name="_replyto" placeholder="example@test.com" required />
          <label className="feedback__form-label" htmlFor="form-message" >Тут ти можеш задати своє запитання, поділитись історією і запитати поради.:</label>
          <textarea className="feedback__form-textarea" id="form-message" name="message" required placeholder="Тут ти можеш задати своє запитання, поділитись історією і запитати поради." />
          <input type="hidden" name="_language" value="uk" />
          <button className="btn feedback__form-btn" type="submit">Надіслати</button>
        </form>
      </div>
    );
  }
}
