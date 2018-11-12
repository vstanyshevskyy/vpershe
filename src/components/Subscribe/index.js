import React from 'react';
import classNames from 'classnames';
import Heart from 'react-icons/lib/fa/heart';
import config from '../../config';
import './index.less';

class SubscribeForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      inProgress: false
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({ inProgress: true });
    window.fetch(config.subscribeApiUrl, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          thanks: true,
          inProgress: false
        });
      });
  }
  render() {
    const subscribeClasses = classNames('subscribe', {
      'subscribe--custom': this.props.className,
      'subscribe--thanks': this.state.thanks,
      'subscribe--in-progress': this.state.inProgress
    });
    const thanksMessage = (
      <div className={subscribeClasses}>
        <Heart className="subscribe__heart" />
        <p className="h3">{this.props.thanksTitle}</p>
        <p>{this.props.thanksText}</p>
      </div>
    );
    return this.state.thanks ? thanksMessage : (
      <div className={subscribeClasses}>
        <form
          className="subscribe__form"
          onSubmit={this.handleSubmit}
        >
          <h3 className="subscribe_header">{this.props.title}</h3>
          <div className="subscribe__controls">
            <input
              aria-label={this.props.emailLabel}
              id="subscribe__form-email"
              className="subscribe__form-email"
              type="email"
              required
              name="email"
              placeholder={this.props.emailPlaceholder}
            />
            <button className="btn subscribe__form-btn">{this.props.buttonText}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubscribeForm;
