import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts';

import './games.less';

export default props => {
  if (!props) {
    return (
      <div>No available games found.</div>
    );
  }
  const { pageContext: { contentItems } } = props;

  return (
    <Layout>
      <div className="games-list">
        <h1>Ігровий інтерактив</h1>
        <div className="games-list-content">
          {contentItems && contentItems.edges.map(game => {
            const { frontmatter } = game.node;

            return (
              <div className="game" key={frontmatter.path}>
                <span className="game-title">{frontmatter.title}</span>
                <div className="game-banner">
                  {frontmatter.banner && <iframe title="game" />}
                  {!frontmatter.banner && <img src="https://github.com/maryjanyes/vpershe-files/blob/master/image_from_ios.jpg?raw=true" alt="Game banner" />}
                </div>
                <Link
                  className="play-game-btn btn btn-link"
                  to={`games/${frontmatter.path}`}
                >
                  {frontmatter.path}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
