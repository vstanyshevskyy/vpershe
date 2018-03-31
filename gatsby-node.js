const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              category
              tags
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    console.log(result);
    console.log(JSON.stringify(result.data.allMarkdownRemark));
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.contentType + '/' + node.frontmatter.path,
        component: path.resolve(`src/templates/${node.frontmatter.contentType}.js`),
        context: {
          slug: node.frontmatter.path,
        } // additional data can be passed via context
      })
    })
  })
}