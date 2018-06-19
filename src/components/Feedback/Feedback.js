import React from 'react';

export default props => (
  <form
    action={`https://formspree.io/${props.email}`}
    method="POST"
  >
    <label htmlFor="form-message" >Повідомлення:</label>
    <textarea id="form-message" name="message" required placeholder="Повідомлення" />
    <label htmlFor="form-contact">Email, щоб ти точно отримав відповідь</label>
    <input id="form-contact" type="text" name="_replyto" placeholder="example@test.com" required />
    <input type="hidden" name="_language" value="uk" />
    <button className="btn btn-primary" type="submit">{props.buttonText}</button>
  </form>
);
