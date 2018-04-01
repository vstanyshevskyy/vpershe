import React, { Component } from 'react'
import Link from 'gatsby-link';
import { Button } from 'reactstrap';
import quizQuestionsData from './questions';
import QuizCard from './quiz-card';
import './avocado-test.css'

class AvocadoTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      isAnswered: false,
      quizStarted: false
    };


    this.questionsData = this.shuffleData(quizQuestionsData);
    this.correctAnswers = this.questionsData.length;

    this.answerTrue = this.answerTrue.bind(this);
    this.answerFalse = this.answerFalse.bind(this);
    this.goAhead = this.goAhead.bind(this);
  }

  calculateResult() {
    const { answerTrue, step } = this.state;
    const questionData = this.questionsData[step];
    const { shortAnswer } = questionData;

    if (answerTrue !== shortAnswer) {
      this.correctAnswers--;
    }
  }

  shuffleData(data) {
    let currentIndex = data.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = data[currentIndex];
      data[currentIndex] = data[randomIndex];
      data[randomIndex] = temporaryValue;
    }

    return data;
  };

  answerTrue() {
    this.setState({
      isAnswered: true,
      answerTrue: true
    });
  }

  answerFalse() {
    this.setState({
      isAnswered: true,
      answerTrue: false
    });
  }

  goAhead() {
    this.calculateResult();
    this.setState(prevState => ({
      step: prevState.step + 1,
      isAnswered: false,
      quizStarted: true
    }));
  }

  getText(questionData, isEnd) {
    const { isAnswered, quizStarted } = this.state;
    const { question, answer } = questionData;
    let result;

    switch(true) {
      case !quizStarted:
        result = `Зміни в тілі під час перехідного віку, як і будь що пов’язане зі здоров’ям,
         завжди огорнуте туманом бабусиних прикмет, народних засобів та міфів.
         Чи зможе Авокадо перехитрити тебе та навішати тобі на вуха лапшу? Час перевірити!`;
        break;
      case isEnd:
        result = 'Молодець!';
        break;
      case isAnswered:
        result = answer;
        break;
      case !isAnswered:
        result = question;
    }

    return result;
  }

  getEndSubtitle() {
    if (this.correctAnswers === 1) {
      return `${this.correctAnswers} правильнa відповідь`;
    }

    if (this.correctAnswers > 1 && this.correctAnswers < 5) {
      return `${this.correctAnswers} правильні відповіді`;
    }

    return `${this.correctAnswers} правильних відповідей`;
  }

  getSubtitle(questionData, isEnd) {
    const { isAnswered, answerTrue, quizStarted } = this.state;
    const { shortAnswer } = questionData;
    const answerGuessed = answerTrue === shortAnswer;
    let subtitle;

    switch(true) {
      case !quizStarted:
        subtitle = 'Міфи про дорослішання (або "лапшометр"?)';
        break;
      case isEnd:
        subtitle = this.getEndSubtitle();
        break;
      case !isAnswered:
        subtitle = '';
        break;
      case answerGuessed:
        subtitle = 'Cаме так';
        break;
      case !answerGuessed:
        subtitle = 'Не зовсім';
    }

    return subtitle;
  }

  getAnswerButtons() {
    return (
      <div className="answer-btn-group">
        <Button className="choice-btn" onClick={this.answerFalse}>Міф</Button>
        чи
        <Button className="choice-btn" onClick={this.answerTrue}>Реальність</Button>
        ?
      </div>
    );
  }

  isNextStepDisabled() {
    const { isAnswered, quizStarted } = this.state;

    return quizStarted && !isAnswered;
  }

  render() {
    const { step, isAnswered, quizStarted } = this.state;
    const questionsLength = this.questionsData.length;
    const isEnd = step === questionsLength - 1;
    const questionContainer = this.questionsData[step];
    const text = this.getText(questionContainer, isEnd);
    const subtitle = this.getSubtitle(questionContainer, isEnd);

    return (
      <div>
        <div className="quiz-container">
          <QuizCard
            title="Avocado Test"
            subtitle={subtitle}
            text={text}
            imageHeight="400"
            imaageWidth="400"
            imageSrc="http://www.learningzonexpress.com/media/catalog/product/cache/1/image/650x/9df78eab33525d08d6e5fb8d27136e95/5/0/507515.jpg"
          />
          {
            (quizStarted && !isEnd) && this.getAnswerButtons()
          }
        </div>
        <div className="btn-container">
        {
          isEnd ?
            <Link to="/quiz-list/">Перейти до списку вікторин</Link>
            :
            <Button className="next-btn" onClick={this.goAhead} disabled={this.isNextStepDisabled()}>
              Далі
            </Button>
        }
      </div>
      </div>
    );
  }
}

export default AvocadoTest
