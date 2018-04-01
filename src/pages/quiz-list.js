import React from 'react';
import Link from 'gatsby-link';

const AvocadoTest = () => (
  <div>
    <Link className="quiz-list-item" to="/avocado-test/">
      <div style={{display: 'inline-block'}}>
        <img
            width="200"
            height="200"
            src="https://i.pinimg.com/originals/8e/25/80/8e2580e4a14839afc2ce1dc02f51bc0e.gif"
            alt="Avocado sTest"
        />
      </div>
      <div>
        <span>Пройти Авокадо Тест</span>
      </div>
    </Link>
  </div>
);

export default AvocadoTest;
