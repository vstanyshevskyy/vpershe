import React from 'react';
import classNames from 'classnames';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { withPrefix } from 'gatsby';
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
      sent: false
    };
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    this.setState({ inProgress: true });
    const promise = onSubmit
      ? onSubmit(event)
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
    const { isOpen } = this.state;
    const { onBoxToggle } = this.props;
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    if (!isOpen) {
      if (!window) {
        return;
      }
      window.scrollTo(0, 0);
    } else {
      this.setState({ sent: false });
    }
    if (onBoxToggle) {
      onBoxToggle();
    }
  }

  keyboardToggle(e) {
    if (e.charCode && e.charCode === 13) {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  }

  render() {
    const {
      isOpen, sent, inProgress, allowedToShare
    } = this.state;
    const {
      toggleButtonText,
      thanksTitle,
      thanksTextAllowedToShare,
      thanksTextNotAllowedToShare,
      formInstructions,
      emailLabel,
      allowToShareLabel,
      yesLabel,
      noLabel,
      questionAreaLabel,
      submitButtonText
    } = this.props;
    const classes = classNames('questionbox', {
      'questionbox--open': isOpen,
      'questionbox--sent': sent
    });
    const formClasses = classNames('questionbox__form', {
      'questionbox__form--in-progress': inProgress
    });

    return (
      <div className={classes}>
        <div role="button" tabIndex="0" onKeyPress={this.keyboardToggle} onClick={this.toggle} className="questionbox__toggler" aria-label="Потрібна порада?">
          <div className="questionbox__toggler-text">{toggleButtonText}</div>
          <img className="questionbox__toggle-icon" src={withPrefix('assets/chat.svg')} alt="" />
        </div>
        <div className="questionbox__container">
          <button
            className="questionbox__form-close"
            onClick={this.toggle}
            type="button"
          >
            <FaTimes />
          </button>
          {
            sent
              ? (
                <div className="questionbox__thanks-container">
                  <FaHeart className="questionbox__heart" />
                  <p className="questionbox__thanks-title">{thanksTitle}</p>
                  <p className="questionbox__thanks-text">
                    {
                      allowedToShare
                        ? thanksTextAllowedToShare
                        : thanksTextNotAllowedToShare
                    }
                  </p>
                </div>
              )
              : (
                <form className={formClasses} onSubmit={this.handleSubmit}>
                  <p className="questionbox__form-description">{formInstructions}</p>
                  <label className="questionbox__form-label" htmlFor="form-contact">{emailLabel}</label>
                  <input id="form-contact" className="questionbox__email-input" type="email" name="email" placeholder={emailLabel} required />
                  <p className="questionbox__form-allow-to-share-text">{allowToShareLabel}</p>
                  <div className="questionbox__form-radiogroup">
                    <input className="questionbox__form-radio-btn" type="radio" id="allowed_to_share_y" name="allowed_to_share" value="true" defaultChecked />
                    <label htmlFor="allowed_to_share_y">{yesLabel}</label>
                    <input className="questionbox__form-radio-btn questionbox__form-radio-btn--no" type="radio" id="allowed_to_share_n" name="allowed_to_share" value="false" />
                    <label htmlFor="allowed_to_share_n">{noLabel}</label>
                  </div>
                  <label className="questionbox__form-label" htmlFor="form-message">{questionAreaLabel}</label>
                  <textarea className="questionbox__form-textarea" id="form-message" name="question" required placeholder={questionAreaLabel} />
                  <button className="btn questionbox__form-btn" type="submit">{submitButtonText}</button>
                </form>
              )
          }
        </div>
      </div>
    );
  }
}
