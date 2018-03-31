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
    const categories = [];
    const tags = [];
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (categories.indexOf(node.frontmatter.category) === -1){
        categories.push(node.frontmatter.category);
      }
      node.frontmatter.tags.forEach(tag => {
        if (tags.indexOf(tag)===-1){
          tags.push(tag);
        }
      })
      createPage({
        path: node.frontmatter.contentType + '/' + node.frontmatter.path,
        component: path.resolve(`src/templates/${node.frontmatter.contentType}.js`),
        context: {
          slug: node.frontmatter.path,
        } // additional data can be passed via context
      })
    })
    console.log(categories);
    console.log(tags);
    categories.forEach(category => {
      createPage({
        path: `categories/${category}`,
        component: path.resolve(`src/templates/categories-index.js`),
        context: {
          category: category
        }
      })
    })
    tags.forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: path.resolve(`src/templates/tags-index.js`),
        context: {
          tag: tag
        }
      })
    })
  })
}