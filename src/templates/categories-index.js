import React from 'react'
import graphql from 'graphql'
import Link from 'gatsby-link'

export default function Template (props) {
  return (
    <div>
      <h1>Статті про {props.pathContext.category}</h1>
      {props.data.allMarkdownRemark.edges.map((post, index) => {
        return (<p key={index}><Link to={`/articles/${post.node.frontmatter.path}`}>{post.node.frontmatter.title}</Link></p>);
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query ArticlesByCategory($category: String!) {
    allMarkdownRemark(filter: { frontmatter:  { category: { eq: $category} }}){
      edges{
       node{
         frontmatter{
           title
           category
           path
           publishTime
           
         }
       }
     }
     }
   
  }
`