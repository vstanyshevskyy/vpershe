const path = require('path');

const getFullUrlBySlug = (slug, allPages) => {
  let linkData;
  Object.keys(allPages).forEach(key => {
    allPages[key].edges.forEach(({
      node: {
        frontmatter: {
          path: url, contentType, list_image: image, image_alt: alt, title
        }
      }
    }) => {
      if (path && path === slug) {
        linkData = {
          url: `/${contentType}/${url}`,
          image,
          alt,
          title
        };
      }
    });
  });
  return linkData;
};

module.exports = (createPage, graphql, allPages, settings) => {
  const gameItemPage = path.resolve('src/templates/gameItemPage.js');

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
        if (node.link) {
          node.link = getFullUrlBySlug(node.link, allPages);
        }
        const depths = node.options ? node.options.map(n => dfs(n, stepDepth + 1)) : [stepDepth];
        const stepMaxDepth = Math.max(...depths);
        node.percentCompleted = Math.floor(stepDepth / (stepMaxDepth - 1) * 100) || 100;
        return stepMaxDepth;
      };
      dfs(gameEdge.node.frontmatter);

      // console.log(JSON.stringify(gameEdge.node.frontmatter, null, 2));
      createPage({
        path: `games/${gameEdge.node.frontmatter.path}`,
        component: gameItemPage,
        context: {
          game: gameEdge.node.frontmatter,
          settings
        }
      });
    });
  });
};
