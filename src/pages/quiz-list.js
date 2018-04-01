import React from 'react';
import Link from 'gatsby-link';
import QuizCard from '../components/avocado-test/quiz-card';

const AvocadoTest = () => (
  <div>
    <Link to="/avocado-test/">
      <QuizCard
        title="Авокадо Тест"
        text="Пройти тест"
        imageWidth="200"
        imageHeight="200"
        imageSrc="http://www.learningzonexpress.com/media/catalog/product/cache/1/image/650x/9df78eab33525d08d6e5fb8d27136e95/5/0/507515.jpg"
      />
    </Link>
  </div>
);

export default AvocadoTest;
