import React from 'react';
import Link from 'gatsby-link';
import './index.less';

export default props => (
  <div className="articles-tiles">
    <h2 className="highlighted">Статті</h2>
    <ul className="articles-tiles__list">
      {
        props.items.map(i => (
          <li className="article-tiles__article">
            <div className="article-tiles__article-wrapper">
              <Link to={`/articles/${i.path}`}>
                <img className="article-tiles__article-image" src={i.list_image} alt="" />
              </Link>
              <Link to={`/articles/${i.path}`} className="article-tiles__article-link">{i.title}</Link>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);
