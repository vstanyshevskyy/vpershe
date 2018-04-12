import React, { Component } from 'react';
import Link from 'gatsby-link';
import { Button } from 'reactstrap';
import quizQuestionsData from './questions';
import QuizCard from './quiz-card';
import './avocado-test.css';

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
      this.correctAnswers -= 1;
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
  }

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

    switch (true) {
    case !quizStarted:
      result = `Зміни в тілі під час перехідного віку, як і будь-що пов’язане зі здоров’ям,
         завжди огорнуте туманом бабусиних прикмет, народних засобів та міфів.
         Чи зможе Авокадо перехитрити тебе та навішати тобі на вуха лапшу? Час перевірити!`;
      break;
    case isEnd:
      result = this.getEndText();
      break;
    case isAnswered:
      result = answer;
      break;
    case !isAnswered:
      result = question;
      break;
    default:
      result = '';
    }

    return result;
  }

  getPercentage() {
    return this.correctAnswers / this.questionsData.length;
  }

  getEndText() {
    const percentage = this.getPercentage();

    if (percentage <= 0.25) {
      return `Хоч нас все життя і вчать слухатися дорослих,
       в сексі та здоров'ї ліпше вірити науковим фактам, а не бабці Любі з третього під'їзда ;)
       Тобі ще є чому навчитися в сексуальній освіті,
       тож лишайся з нами і ми тебе всього навчимо - це буде захоплива подорож. :)`;
    }

    if (percentage <= 0.5) {
      return `Непогано, але тобі ще є чого навчитися. Нічого, якщо лишишся з ВПЕРШЕ,
       тебе чекає захоплива подорож через космічні системи знань з сексуальної освіти!
       Тримайся міцніше - скоро станеш експертом! ;)`;
    }

    if (percentage <= 0.75) {
      return `А тебе важко надурити! ;) Але якщо хочеш стати першокласним космонавтом сексуальної
       освіти, доведеться ще трошки повчитися. Лишайся з ВПЕРШЕ - ми з цим допоможемо :)`;
    }

    return `Вау, хто це тут такий крутелик? Тебе неможливо надурити,
     адже ти відчуваєш брехню на запах навіть за сто світлових років!
     Але чи ти розбираєшся так само добре в інших сферах сексуальної освіти? ;)
     Лишайся на ВПЕРШЕ і перевіряй свої знання разом з нами!`;
  }

  getEndSubtitle() {
    const percentage = this.getPercentage();

    if (percentage <= 0.25) {
      return 'Ти - новонароджене авокадо!';
    }

    if (percentage <= 0.5) {
      return 'Ти - юне авокадо!';
    }

    if (percentage <= 0.75) {
      return 'Ти - молоде авокадо!';
    }

    return 'Ти - зріле авокадо!';
  }

  getSubtitle(questionData, isEnd) {
    const { isAnswered, answerTrue, quizStarted } = this.state;
    const { shortAnswer } = questionData;
    const answerGuessed = answerTrue === shortAnswer;
    let subtitle;

    switch (true) {
    case !quizStarted:
      subtitle = 'Хелоу!';
      break;
    case isEnd:
      subtitle = this.getEndSubtitle();
      break;
    case !isAnswered:
      subtitle = '';
      break;
    case answerGuessed:
      subtitle = 'Cаме так!';
      break;
    case !answerGuessed:
      subtitle = 'Неправда';
      break;
    default:
      subtitle = '';
    }


    return subtitle;
  }

  getAnswerButtons() {
    return (
      <div className="answer-btn-group">
        <Button className="choice-btn myth-btn" onClick={this.answerFalse}>Міф</Button>
        чи
        <Button className="choice-btn reality-btn" onClick={this.answerTrue}>Реальність</Button>
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
      <div className="quiz-body">
        <div className="quiz-container">
          <QuizCard
            subtitle={subtitle}
            text={text}
            isAnswered={isAnswered}
            quizStarted={quizStarted}
            isEnd={isEnd}
            imageHeight="300"
            imageWidth="400"
            imageSrc="https://i.pinimg.com/originals/8e/25/80/8e2580e4a14839afc2ce1dc02f51bc0e.gif"
          />
          {
            (!isAnswered && quizStarted && !isEnd) && this.getAnswerButtons()
          }
        </div>
        <div className="btn-container">
          {
            isEnd ?
              <Link to="/quiz-list/">
                <Button className="next-btn end-btn">Перейти до списку вікторин</Button>
              </Link>
              :
              (!quizStarted || isAnswered) ?
                <Button className="next-btn" onClick={this.goAhead} disabled={this.isNextStepDisabled()}>
                  {
                    quizStarted ?
                      <span>Далі</span>
                      :
                      <span>Почати гру</span>
                  }
                </Button>
                : null
          }
        </div>
      </div>
    );
  }
}

export default AvocadoTest;
