import React from 'react';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import { withPrefix } from 'gatsby-link';
import Heart from 'react-icons/lib/fa/heart';
import './index.less';

export default class QuestionboxForm extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.keyboardToggle = this.keyboardToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isOpen: false,
      inProgress: false,
      sent: true
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ inProgress: true });
    const promise = this.props.onSubmit
      ? this.props.onSubmit(event)
      : Promise.resolve();
    const allowedToShare = new FormData(event.target).get('allowed_to_share') === 'true';
    promise.then(() => {
      this.setState({
        sent: true,
        inProgress: false,
        allowedToShare
      });
    });
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
    } else {
      this.setState({ sent: false })
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
      'questionbox--open': this.state.isOpen,
      'questionbox--sent': this.state.sent
    });
    const formClasses = classNames('questionbox__form', {
      'questionbox__form--in-progress': this.state.inProgress
    });

    return (
      <div className={classes}>
        <div role="button" tabIndex="0" onKeyPress={this.keyboardToggle} onClick={this.toggle} className="questionbox__toggler" aria-label="Потрібна порада?">
          <div className="questionbox__toggler-text">{this.props.toggleButtonText}</div>
          <img className="questionbox__toggle-icon" src={withPrefix('assets/chat.svg')} alt="" />
        </div>
        <div className="questionbox__container">
          <button
            className="questionbox__form-close"
            onClick={this.toggle}
            type="button"
          >
            <FaClose />
          </button>
          {
            this.state.sent
              ? (
                <div className="questionbox__thanks-container">
                  <Heart className="questionbox__heart" />
                  <p className="questionbox__thanks-title">{this.props.thanksTitle}</p>
                  <p className="questionbox__thanks-text">
                    {
                      this.state.allowedToShare
                        ? this.props.thanksTextAllowedToShare
                        : this.props.thanksTextNotAllowedToShare
                    }
                  </p>
                </div>
              )
              : (
                <form className={formClasses} onSubmit={this.handleSubmit}>
                  <p className="questionbox__form-description">{this.props.formInstructions}</p>
                  <label className="questionbox__form-label" htmlFor="form-contact">{this.props.emailLabel}</label>
                  <input id="form-contact" className="questionbox__email-input" type="email" name="email" placeholder={this.props.emailLabel} required />
                  <p className="questionbox__form-allow-to-share-text">{this.props.allowToShareLabel}</p>
                  <div className="questionbox__form-radiogroup">
                    <input className="questionbox__form-radio-btn" type="radio" id="allowed_to_share_y" name="allowed_to_share" value="true" checked />
                    <label htmlFor="allowed_to_share_y">{this.props.yesLabel}</label>
                    <input className="questionbox__form-radio-btn questionbox__form-radio-btn--no" type="radio" id="allowed_to_share_n" name="allowed_to_share" value="false" />
                    <label htmlFor="allowed_to_share_n">{this.props.noLabel}</label>
                  </div>
                  <label className="questionbox__form-label" htmlFor="form-message" >{this.props.questionAreaLabel}</label>
                  <textarea className="questionbox__form-textarea" id="form-message" name="question" required placeholder={this.props.questionAreaLabel} />
                  <button className="btn questionbox__form-btn" type="submit">{this.props.submitButtonText}</button>
                </form>
              )
          }
        </div>
      </div>
    );
  }
}
