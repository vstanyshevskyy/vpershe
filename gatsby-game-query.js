const path = require('path');

const getFullUrlBySlug = (slug, allPages) => {
  let linkData;
  allPages.forEach(({
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
  return linkData;
};

module.exports = (createPage, graphql) => {
  const gameItemPage = path.resolve('src/templates/games/index.js');

  return graphql(`
  {
    games: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "games"}}}) {
      edges {
        node {
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
      }
    }
    settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "general_settings"}}}) {
      edges {
        node {
          frontmatter {
            title
            url
            favicon  {
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
              relativePath
            }
            imageAlt: image_alt
            title
            subtitle
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
          node.link = getFullUrlBySlug(node.link, result.data.allPages.edges);
        }
        const depths = node.options ? node.options.map(n => dfs(n, stepDepth + 1)) : [stepDepth];
        const stepMaxDepth = Math.max(...depths);
        node.percentCompleted = Math.floor(stepDepth / (stepMaxDepth - 1) * 100) || 100;
        return stepMaxDepth;
      };
      dfs(gameEdge.node.frontmatter);

      createPage({
        path: `games/${gameEdge.node.frontmatter.path}`,
        component: gameItemPage,
        context: {
          game: gameEdge.node.frontmatter,
          settings: result.data.settings.edges[0].node.frontmatter
        }
      });
    });
  });
};
