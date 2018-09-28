import React from 'react';
import classNames from 'classnames';
import './index.less';

export default props => {
  const subscribeClasses = classNames('subscribe', {
    'subscribe--custom': props.className
  });
  return (
    <div className={subscribeClasses}>
      <form
        className="subscribe__form"
        action={`https://formspree.io/${props.email}`}
        method="POST"
      >
        <h3 className="subscribe_header">Найцікавіше, для тебе!</h3>
        <div className="subscribe__controls">
          <input
            aria-label="Введи свій email для того щоб регулярно отримувати наші публікації"
            id="subscribe__form-email"
            className="subscribe__form-email"
            type="email"
            required
            name="_replyto"
            placeholder="Твій e-mail"
          />
          <input type="hidden" name="_language" value="uk" />
          <button className="btn subscribe__form-btn">Підписатися</button>
        </div>
      </form>
    </div>
  );
};
