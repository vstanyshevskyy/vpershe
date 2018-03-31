import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Link from 'gatsby-link'

const ArchivePage = () => (
  <div>
    <h1>Archive</h1>
    <p>Welcome to Archive</p>    
    <ul>{linksList}</ul>

    <Link to="/">Go back to the homepage</Link>
  </div>
)

const articles = [{id: 1 , name: 'New article'}, {id: 2 , name: 'Second article'}, ];

const linksList = articles.map((article) => {
  return (
    <Router key={article.id}>
      <li style={{
            color: 'white',
            textDecoration: 'none',
          }}><Link to={"/article"+article.id}>Post : { article.name }</Link></li>
    </Router> 
  )
});

export default ArchivePage
