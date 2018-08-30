import React from 'react';
import Link from 'gatsby-link';
import './index.less';

export default props => (
  <div className="articles-tiles">
    <h2 className="highlighted">Статті</h2>
    <ul className="articles-tiles__list">
      {
        props.items.map(i => {
          const url = `/articles/${i.path}`;
          return (
            <li key={url} className="article-tiles__article">
              <div className="article-tiles__article-wrapper">
                <Link to={url}>
                  <img alt={i.list_image_alt} className="article-tiles__article-image" src={i.list_image} />
                </Link>
                <Link to={url} className="article-tiles__article-link">{i.title}</Link>
              </div>
            </li>
          );
        })
      }
    </ul>
  </div>
);
