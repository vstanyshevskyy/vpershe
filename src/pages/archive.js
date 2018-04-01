import React from 'react'
import Link from 'gatsby-link'

const ArchivePage = ({data}) => 
{
  const articles = data.allMarkdownRemark.edges.map(edge => edge.node.frontmatter);
  
  const categories = groupByCategory(articles, "category").map(c => addCategory(c));
  
  return (
  <div className='container-fluid'>
	  <div className="panel panel-primary">
		  <div className="panel-heading">
			  <h1 className='text-center'>Архів</h1>
		  </div>
		  <div className="panel-body">
			  {categories}
		  </div>
	  </div>
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
  return (
	  <li>
      <Link to={"/articles/"+ article.path}>{ article.title }</Link>
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

