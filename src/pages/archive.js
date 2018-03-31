import React from 'react'
import Link from 'gatsby-link'

const ArchivePage = ({data}) => 
{
  const articles = data.allMarkdownRemark.edges.map(edge => edge.node.frontmatter);
  
  const categories = groupByCategory(articles, "category").map(c => addCategory(c));
  console.log(categories);
  
  return (
  <div>
    <h1>Archive</h1>
    <p>Welcome to Archive</p>    
    {categories}

    <Link to="/">Go back to the homepage</Link>
  </div>
)};

const addCategory = (category) => {

  const posts = category.articles.map((a) => addPost(a));

  return (
    <div>
      <h2>{category.name}</h2>
      <ul>{posts}</ul>
    </div>
  )};


const addPost = (article) => {
  console.log(article);
  return (
    <li  style={{
      color: 'red',
      textDecoration: 'none',
    }}><Link to={"/article/"+ article.path}>Post : { article.title }</Link>
  </li>
  )
};

const groupByCategory = (items, key) =>{ 
    let groups = [];
    items.forEach(
      (item) => {
        var category = groups.find(r => r.name === item[key]);
        if(category)
        {
          category.articles.push(item);  
        } else {
          groups.push({
            name: item[key],
            articles: [item]
          })
        }
      });
      return groups;
};

export default ArchivePage

export const pageQuery = graphql`
  query IndexQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              title
              category
              tags        
            }
          }
        }      
    }
  }
`;

