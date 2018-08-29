import React from 'react';
import Link from 'gatsby-link';
import './index.less';

export default props => (
  <li className="article-card">
    <Link to={props.url}>
      <img className="article-card__image" src={props.image} alt="" />
    </Link>
    <Link className={`article-card__title article-card__title--${props.contentType}`} to={props.url}>
      {props.title}
    </Link>
    <p className="article-card__subtitle">
      {props.subtitle}
    </p>
  </li>
);