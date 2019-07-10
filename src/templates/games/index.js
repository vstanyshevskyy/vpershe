import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../layouts';
import SEO from '../../components/SEO';
import './index.less';

const getFullUrlBySlug = (slug, allPages) => {
  let linkData;
  allPages.forEach(({
    node: {
      frontmatter: {
        path: url, contentType, image, imageAlt: alt, title
      }
    }
  }) => {
    if (url && url === slug) {
      linkData = {
        url: `/${contentType}/${url}`,
        image,
        alt,
        title
      };
    }
  });
  return linkData;
};

const prepareGameData = (game, allPages) => {
  const dfs = (gameData, stepDepth = 0) => {
    if (gameData.link) {
      gameData.link = getFullUrlBySlug(gameData.link, allPages);
    }
    const depths = gameData.options ? gameData.options.map(n => dfs(n, stepDepth + 1)) : [stepDepth];
    const stepMaxDepth = Math.max(...depths);
    gameData.percentCompleted = Math.floor(stepDepth / (stepMaxDepth - 1) * 100) || 100;
    return stepMaxDepth;
  };

  dfs(game);

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
    <div className="quest-game__useful-link">
      <Img
        fluid={link.image.childImageSharp.fluid}
        alt={link.alt}
        height={50}
      />
      <a href={link.url} target="blank">
        {link.title}
      </a>
    </div>
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
    const {
      data: {
        game: { frontmatter: gameData },
        generalSettings: { frontmatter: settings },
        allPages: { edges: allPages }
      }
    } = this.props;
    const game = prepareGameData(gameData, allPages);
    this.settings = settings;
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
              src={image.relativePath ? `/assets/${image.relativePath}` : '/' + image.replace(/.\.\/static/g, '')}
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


export const pageQuery = graphql`
  query gameQuery($slug: String!) {
    game: markdownRemark(
      frontmatter: {
        path: { eq: $slug }
        contentType: { eq: "games" }
      }
    ) {
      frontmatter {
        path
        title
        contentType
        image {
          relativePath
        }
        options {
          buttonText
          title
          image {
            relativePath
          }
          link
          options {
            buttonText
            title
            link
            image
            options {
              buttonText
              title
              image
              link
              options {
                buttonText
                title
                image
                link
                options {
                  buttonText
                  title
                  image
                  link
                  options {
                    buttonText
                  }
                }
              }
            }
          }
        }
      }
    }
    allPages: allMarkdownRemark(
      filter: {
        frontmatter: {
          contentType: { in: ["articles", "stories", "sexoteca"] }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            contentType
            image {
              childImageSharp {
                fluid(maxWidth: 320, maxHeight: 320, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            imageAlt: image_alt
            title
            subtitle
          }
        }
      }
    }
    generalSettings: markdownRemark(
      frontmatter:  { contentType: { eq: "general_settings" }}
    ) {
      frontmatter {
        title
        url
        titleTemplate
        organizationTitle
        defaultAuthor
        favicon {
          relativePath
        }
        metaDescription
        metaKeywords
        fbTitle
        fbImage {
          relativePath
        }
        fbDescription
      }
    }
  }
`;
