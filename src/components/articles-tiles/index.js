import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './index.less';

export default ({ items }) => (
  <div className="articles-tiles">
    <h2>Статті</h2>
    <ul className="articles-tiles__list">
      {
        items.map(i => {
          const url = `/articles/${i.path}`;
          return (
            <li key={url} className="article-tiles__article">
              <div className="article-tiles__article-wrapper">
                <Link to={url} className="article-tiles__article-image-link">
                  <Img alt={i.image_alt} className="article-tiles__article-image" fluid={i.image.childImageSharp.fluid} />
                </Link>
                <Link to={url} className="article-tiles__article-link">{i.title}</Link>
              </div>
            </li>
          );
        })
      }
    </ul>
    <Link to="/articles" className="link__all-records">Всі статті</Link>
  </div>
);
