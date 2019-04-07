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
    const { node } = options.pageContext.contentType;
    const game = node.frontmatter;

    return {
      gameLink: `games/${game.path}`,
      title: game.title,
      steps: game.steps
    };
  };
  if (!props) {
    return null;
  }
  const game = transformPageContextItemToGameItem(props);
  return (
    <div className="games-list">
      <h2>{game.title}</h2>
      {game.steps && game.steps.map((gameStep, index) => {
        gameStep.index = index;
        return (
          <GameStep {...gameStep} />
        );
      })}
    </div>
  );
};
