const path = require('path');

module.exports = (createPage, graphql) => {
  const gamesPage = path.resolve('src/templates/gamesListPage.js');
  const gameItemPage = path.resolve('src/templates/gameItemPage.js');

  // TODO: add bannerUrl query property
  return graphql(`
    {
      games: allMarkdownRemark (
        filter: { frontmatter: { contentType: { eq: "games" } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              contentType,
              steps {
                body,
                title
              }
            }
          }
        }
      }
    }`).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    const contentItems = result.data.games;
    createPage({
      path: 'games',
      component: gamesPage,
      context: {
        contentItems
      }
    });
    result.data.games.edges.forEach(edge => {
      createPage({
        path: `games/${edge.node.frontmatter.path}`,
        component: gameItemPage,
        context: {
          contentType: edge
        }
      });
    });
  });
};
