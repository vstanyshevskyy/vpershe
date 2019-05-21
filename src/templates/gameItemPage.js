import React from 'react';

import Layout from '../layouts';
import './game.less';

const transformPageContextItemToGameItem = options => {
  const { game } = options.pageContext;

  return {
    path: `games/${game.path}`,
    ...game
  };
};

export const GameChoice = props => {
  const { buttonText, onChoiceAnswer } = props;

  return <button type="button" onClick={onChoiceAnswer}>{buttonText}</button>;
};

export const GameProgressBar = props => {
  const { progress } = props;

  return (
    <div className="progressBar">
      <span className="track" style={{ width: `${progress}%` }} />
    </div>
  );
};

export const GameUsefullLink = props => {
  const { link } = props;

  return (
    <p className="usefullLink">
      <img
        src="/assets/uploads/illustration-final.png"
        title="game image"
        alt="use-full article preview img"
        height={50}
      />
      <a href={link} target="blank">
        Рекомендованна сттатя
      </a>
    </p>
  );
};

export default class Game extends React.Component {
  state = {
    isStarted: false,
    title: '',
    percentCompleted: 0,
    options: [],
    image: '',
    link: ''
  }

  initialState = {}

  componentDidMount() {
    const game = transformPageContextItemToGameItem(this.props);
    this.initialState = game;
    this.setState({
      title: game.title,
      options: game.options
    });
  }

  onChoiceAnswer(data) {
    const {
      title, percentCompleted, options, link, image
    } = data;
    this.setState({
      title, percentCompleted, options, link, image
    });
  }

  startGame() {
    this.setState({ isStarted: true });
  }

  restartGame() {
    const { options, title } = this.initialState;
    this.setState({
      title,
      options,
      percentCompleted: 0,
      link: '',
      image: ''
    });
  }

  render() {
    const {
      title,
      percentCompleted,
      options,
      link,
      image,
      isStarted
    } = this.state;

    if (!this.props) {
      return null;
    }

    return (
      <Layout>
        <div className="game-wrapper">
          <header>
            {isStarted ? (
              <GameProgressBar progress={percentCompleted} />
            ) : (
              <h1>{title}</h1>
            )}
          </header>
          <section>
            <img
              src={image || '/assets/uploads/illustration-final.png'}
              title="game image"
              alt="question img"
              height={250}
            />
            {isStarted ? (
              <>
                <h2>{title}</h2>
                <ul className="answers">
                  {options
                    && options.map((option, index) => (
                      <li key={index}>
                        <GameChoice
                          {...option}
                          onChoiceAnswer={() => this.onChoiceAnswer(option)}
                        />
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <button type="button" onClick={() => this.startGame()}>Грати</button>
            )}
          </section>
          <footer>
            {percentCompleted === 100 && (
              <div>
                {link && <GameUsefullLink link={link} />}
                <button type="button" onClick={() => this.restartGame()}>
                  Спробувати ще раз
                </button>
              </div>
            )}
          </footer>
        </div>
      </Layout>
    );
  }
}
