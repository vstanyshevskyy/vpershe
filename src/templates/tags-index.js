import React from 'react';
import graphql from 'graphql';
import Link from 'gatsby-link';

export default function Template (props) {
  return (
    <div>
      <h1>Статті з тегом &quot;{ props.pathContext.tag }&quot;</h1>
      {props.data.allMarkdownRemark.edges.map((post, index) => (<p key={index}><Link to={`/articles/${post.node.frontmatter.path}`}>{post.node.frontmatter.title}</Link></p>))}
    </div>
  );
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
`;
