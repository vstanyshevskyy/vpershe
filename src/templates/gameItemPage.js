import React from 'react';

class GameStep extends React.Component {
  render() {
    const { title, index } = this.props;
    return (
      <div>
        { index }
         :
        {title}
      </div>
    );
  }
}

export default props => {
  const transformPageContextItemToGameItem = options => {
    const game = options.pageContext.game;

    return {
      path: `games/${game.path}`,
      ...game
    };
  };
  if (!props) {
    return null;
  }
  const game = transformPageContextItemToGameItem(props);
  return (
    <div className="games-list">
      <h2>{game.title}</h2>
      {game.options && game.options.map((option, index) => {
        option.index = index;
        return (
          <GameStep {...option} />
        );
      })}
    </div>
  );
};
