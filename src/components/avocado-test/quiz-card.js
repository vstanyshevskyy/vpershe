import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

const QuizCard = props => {
  const { title, subtitle, text, imageSrc, imageWidth, imageHeight } = props;

  return (
    <Card>
      <CardImg
        style={{float: 'left'}}
        width={imageWidth}
        height={imageHeight}
        src={imageSrc}
        alt="Avocado"
        />
      <CardBody className="item-card">
        <CardTitle>{ title }</CardTitle>
        <CardSubtitle>{ subtitle }</CardSubtitle>
        <CardText>{ text }</CardText>
      </CardBody>
    </Card>
  );
}

export default QuizCard
