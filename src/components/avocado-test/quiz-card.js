import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody
} from 'reactstrap';
import classNames from 'classnames';
import './avocado-test.css';

const QuizCard = props => {
  const {
    subtitle,
    text,
    imageSrc,
    imageWidth,
    imageHeight,
    isAnswered,
    quizStarted,
    isEnd
  } = props;
  const classForItemCard = classNames('item-card', {
    'item-card--right': quizStarted
  });
  const classForAvocadoContainer = classNames('avocado-container', {
    'avocado-centered': !quizStarted
  });
  const classForThought = classNames('avocado-thought', {
    'end-thought': isEnd
  });

  return (
    <Card>
      <div className={classForAvocadoContainer}>
        <CardImg
          className="avocado-running"
          width={imageWidth}
          height={imageHeight}
          src={imageSrc}
          alt="Avocado"
        />
        {
          (isAnswered || !quizStarted || isEnd) &&
            <div className="clearfix thought-container">
              <span className={classForThought}>{ subtitle }</span>
            </div>
        }
      </div>
      <CardBody className={classForItemCard}>
        <CardText className="text-wrapper">{ text }</CardText>
      </CardBody>
    </Card>
  );
};

export default QuizCard;
