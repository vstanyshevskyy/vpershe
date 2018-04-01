import React from 'react'
import graphql from 'graphql'
import {withPrefix} from 'gatsby-link'
import Link from 'gatsby-link'
import Navbar from '../components/Nav/Nav';

export default function Template ({ data }) {
  const post = data.markdownRemark.frontmatter;
  const image = post.image ? <img src={withPrefix(post.image)} alt={post.title}/> : null;
  return (
    <div>
      <Navbar />
      <h1>{post.title}</h1>
      {image}
      <div>Категорія: <Link to={`/categories/${post.category}`}>{post.category}</Link></div>
      <div>Теги: {
        (post.tags || []).map((tag, index)=>{
          return (<span key={index}>{!!index && ", "}<Link to={`/tags/${tag}`}>{tag}</Link></span>);
        })
      }</div>
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
        category        
        title
        image
        tags
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
