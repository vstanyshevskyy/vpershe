import React from 'react';

const transformPageContextItemToGameItem = options => {
  const game = options.pageContext.game;

  return {
    path: `games/${game.path}`,
    ...game
  };
};

class GameChoice extends React.Component {
  render() {
    const { buttonText, index, onChoiceAnswer } = this.props;
    return (
      <button onClick={onChoiceAnswer}>
        { index }
         :
        { buttonText }
      </button>
    );
  }
}

export default class Game extends React.Component {
  state = {
    isStarted: false,
    title: '',
    percentCompleted: 0,
    options: [],
    image: '',
    link: '',
  }
  initialState = {};
  

  componentDidMount() {
    const game = transformPageContextItemToGameItem(this.props);
    this.initialState = game;
    this.setState({
      title: game.title,
      options: game.options
    });
    console.log('game data: ', game);
  }

  onChoiceAnswer(data) {
    if (!data) return;
    console.log('next game state: ', data);
    const {title, percentCompleted, options, link, image} = data;
    this.setState({title, percentCompleted, options, link, image});
  }

  startGame() {
    this.setState({isStarted: true});
  }

  restartGame() {
    const { options, title} = this.initialState;
    this.setState({
      title,
      options,
      percentCompleted: 0,
      link: '',
      image: '',
    });
  }

  render() {
    const { title, percentCompleted, options, link, image, isStarted } = this.state;
        
    if (!this.props) {
      return null;
    }

    return (
      <div className="game">
        <h2>{title}</h2>
        <h4>Current percentCompleted: {percentCompleted}</h4>
        <ul>
        {isStarted 
          ? options && options.map((option, index) => (
              <li key={index}>
                <GameChoice
                  index={index} {...option} 
                  onChoiceAnswer={() => this.onChoiceAnswer(option)} 
                />
              </li>
            ))
          : <button onClick={() => this.startGame()}>Start game</button>  
        }
        </ul>
        {percentCompleted == 100 &&
          <div>
            {link &&
              <p>Use-full article:
                <a href={link} target="_blank">
                  {image 
                    ? <img src={image} width={250} title={link} alt="use-full article image"></img>
                    : <span>{link}</span>
                  }
                </a>
              </p>
            }
            <button onClick={() => this.restartGame()}>Restart</button>
          </div>
        }
      </div>
    );
  }
};
