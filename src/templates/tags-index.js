import React from 'react'
import graphql from 'graphql'
import Link from 'gatsby-link'
import Navbar from '../components/Nav/Nav';

export default function Template (props) {
  return (
    <div>
      <Navbar />
      <h1>Статті з тегом "{props.pathContext.tag}"</h1>
      {props.data.allMarkdownRemark.edges.map((post, index) => {
        return (<p key={index}><Link to={`/articles/${post.node.frontmatter.path}`}>{post.node.frontmatter.title}</Link></p>);
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query ArticlesByTag($tag: String!) {
    allMarkdownRemark(filter: { frontmatter:  { tags: {in: [$tag]} }}){
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