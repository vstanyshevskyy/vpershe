const path = require('path');

module.exports = (createPage, graphql) => {
  const gamesPage = path.resolve('src/templates/gamesListPage.js');
  const gameItemPage = path.resolve('src/templates/gameItemPage.js');

  // TODO: add bannerUrl query property
  return graphql(`
  {
    games: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "games"}}}) {
      edges {
        node {
          frontmatter {
            path
            title
            contentType
            image
            options {
              buttonText
              title
              image
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
      }
    }
  }  
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    result.data.games.edges.map(gameEdge => {
      const dfs = (node, stepDepth = 0) => {
        const depths = node.options ? node.options.map(n => {
          return dfs(n, stepDepth + 1);
        }) : [stepDepth];
        const stepMaxDepth = Math.max(...depths);
        node.percentCompleted = Math.floor(stepDepth / stepMaxDepth * 100);
        return stepMaxDepth;
      };
      dfs(gameEdge.node.frontmatter);

      console.log(JSON.stringify(gameEdge.node.frontmatter, null, 2));
      createPage({
        path: `games/${gameEdge.node.frontmatter.path}`,
        component: gameItemPage,
        context: {
          game: gameEdge.node.frontmatter
        }
      });
    });
    // const contentItems = result.data.games;
    // createPage({
    //   path: 'games',
    //   component: gamesPage,
    //   context: {
    //     contentItems
    //   }
    // });
    // result.data.games.edges.forEach(edge => {
    //   createPage({
    //     path: `games/${edge.node.frontmatter.path}`,
    //     component: gameItemPage,
    //     context: {
    //       contentType: edge
    //     }
    //   });
    // });
  });
};
