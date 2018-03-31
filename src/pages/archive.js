import React from 'react'
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
    <ul key={article.id}>
      <li style={{
            color: 'white',
            textDecoration: 'none',
      }}>..</li>
    </ul>
  )
});

export default ArchivePage
