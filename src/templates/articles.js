import React from 'react'
import graphql from 'graphql'

export default function Template ({ data }) {
  const post = data.markdownRemark.frontmatter;
  return (
    <div>
      <h1>{post.title}</h1>
      <div className="content" dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></div>
    </div>
  )
}

export const pageQuery = graphql`
  query ArticleByPath($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        path
        title
      }
    }

    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
            path
          }
        }
      }
    }
  }
`
