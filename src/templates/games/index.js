import React from 'react';

import Layout from '../../layouts';
import SEO from '../../components/SEO';
import './index.less';

const transformPageContextItemToGameItem = options => {
  const { game } = options.pageContext;

  return {
    path: `games/${game.path}`,
    ...game
  };
};

export const GameChoice = props => {
  const { buttonText, onChoiceAnswer } = props;

  return <button onClick={onChoiceAnswer} type="button">{buttonText}</button>;
};

export const GameProgressBar = props => {
  const { progress } = props;

  return (
    <div className="quest-game__progress-bar">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
};

export const GameUsefulLink = props => {
  const { link } = props;

  return (
    <p className="quest-game__useful-link">
      <img
        src={link.image}
        alt={link.alt}
        height={50}
      />
      <a href={link.url} target="blank">
        {link.title}
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
    const { pageContext: { settings } } = this.props;
    this.settings = settings;
    console.log(settings);
    this.initialState = game;
    this.setState({
      title: game.title,
      options: game.options,
      image: game.image
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
    this.setState({
      ...this.initialState,
      link: '',
      percentCompleted: 0
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
        <SEO data={{ useTitleTemplate: false }} defaults={this.settings} />
        <div className="quest-game">
          <header>
            {isStarted ? (
              <GameProgressBar progress={percentCompleted} />
            ) : (
              <h1>{title}</h1>
            )}
          </header>
          <section>
            <img
              src={image}
              alt="game"
            />
            {isStarted ? (
              <>
                <h2>{title}</h2>
                {link && <GameUsefulLink link={link} />}
                <ul className="quest-game__answers">
                  {options && options.map((option, index) => (
                    <li key={index}>
                      <GameChoice
                        {...option}
                        onChoiceAnswer={() => (
                          option.percentCompleted <= 100
                            ? this.onChoiceAnswer(option)
                            : this.restartGame()
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="quest-game__answers">
                <button onClick={() => this.startGame()} type="button">Грати</button>
              </div>
            )}
          </section>
          <footer>
            {!options && (
              <div>
                <ul className="quest-game__answers">
                  <li>
                    <button type="button" onClick={() => this.restartGame()}>
                      Спробувати ще раз
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </footer>
        </div>
      </Layout>
    );
  }
}
