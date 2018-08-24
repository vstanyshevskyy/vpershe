import React from 'react';
import classNames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import FaMale from 'react-icons/lib/fa/male';
import FaFemale from 'react-icons/lib/fa/female';
import './index.less';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const classes = classNames('feedback', {
      'feedback--open': this.state.isOpen
    });
    return (
      <div className={classes}>
        <div role="button" tabIndex="0" onKeyDown={this.toggle} onClick={this.toggle} className="feedback__toggler">
          <div className="feedback__toggler-text">Потрібна порада?</div>
        </div>
        <div role="none" className="form__fader" onClick={this.toggle} />
        <form
          className="feedback__form"
          action={`https://formspree.io/${this.props.email}`}
          method="POST"
        >
          <button className="feedback__form-close" onClick={this.toggle} ><FaClose /></button>
          <p className="feedback__form-description" >Кілька слів, які пояснюють, що це за форма, про анонімність, і що людина отримає відповідь на свій мейл і у розділі Поради.</p>
          <label className="feedback__form-label" htmlFor="form-contact">Email, щоб ти точно отримав відповідь</label>
          <input id="form-contact" type="text" name="_replyto" placeholder="example@test.com" required />
          <label className="feedback__form-label" htmlFor="form-age">Вік</label>
          <input className="feedback__form-age" id="form-age" type="number" name="age" placeholder="Вік" />
          <label className="feedback__form-label" htmlFor="form-message" >Тут ти можеш задати своє запитання, поділитись історією і запитати поради.:</label>

          <span>Стать:</span>
          <label aria-label="Стать - Чоловіча" className="feedback__form-label feedback__form-label--gender">
            <input type="radio" name="gender" value="male" />
            <FaMale />
          </label>
          <label aria-label="Стать - Жіноча" className="feedback__form-label feedback__form-label--gender">
            <input type="radio" name="gender" value="female" />
            <FaFemale />
          </label>
          <textarea className="feedback__form-textarea" id="form-message" name="message" required placeholder="Тут ти можеш задати своє запитання, поділитись історією і запитати поради." />
          <input type="hidden" name="_language" value="uk" />
          <button className="btn feedback__form-btn" type="submit">{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}
