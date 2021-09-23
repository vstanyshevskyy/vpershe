import React, { useState } from 'react';
import ArticleCard from '../article-card'
import Subscribe from '../subscribe';

export default ({ items }) => {
  const groups = [];
  for (let i = 0; i < items.length; i += 6) {
    groups.push([...items.slice(i, i + 6)])
  }
  const [page, setPage] = useState(2)
  return (
    <>
      {groups.slice(0, page).map((items, groupIdx) => (
        <>
          { groupIdx > 0 && groupIdx % 2 === 0 ? <Subscribe /> : null }
          <ul className="homepage-articles-wrapper">
            {items[0] && <ArticleCard {...items[0]} type="half" />}
            {items[1] && <ArticleCard {...items[1]} type="half" />}
            {items[2] && <ArticleCard {...items[2]} type="third" />}
            {items[3] && <ArticleCard {...items[3]} type="third" />}
            {items[4] && <ArticleCard {...items[4]} type="third" />}
            {items[5] && <ArticleCard {...items[5]} type="full" />}
          </ul>
        </>
      ))}
      {page!==groups.length && <button className="btn load-more-btn" onClick={() => setPage(page + 1)}>Читати більше</button>}
    </>
  )
}