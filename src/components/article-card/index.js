/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'gatsby';
import './index.less';

export default ({
  url, image, image_alt, contentType, title, subtitle
}) => (
  <li className="article-card">
    <Link to={url}>
      <img alt={image_alt} className="article-card__image" src={image} />
    </Link>
    <Link className={`article-card__title article-card__title--${contentType}`} to={url}>
      {title}
    </Link>
    <p className="article-card__subtitle">
      {subtitle}
    </p>
  </li>
);
