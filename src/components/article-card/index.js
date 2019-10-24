/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { getUniqueId, CardClickHelper } from '../../helpers';
import './index.less';

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);

    this.clickHelper = new CardClickHelper();
  }

  render() {
    const {
      url, image, contentType, title, subtitle
    } = this.props;
    const uid = getUniqueId(url);
    const subtitleClassName = 'article-card__subtitle';
    const textUid = `${subtitleClassName}-${uid}`;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className="article-card"
        onMouseUp={e => this.clickHelper.onMouseUp(e)}
        onMouseDown={e => this.clickHelper.onMouseDown(e)}
      >
        <Img alt="" className="article-card__image" fluid={image.childImageSharp.fluid} />
        <Link
          className={`article-card__title article-card__title--${contentType}`}
          ref={el => this.clickHelper.addLink(el)}
          aria-describedby={textUid}
          to={url}
        >
          {title}
        </Link>
        <p className={subtitleClassName} id={textUid} aria-hidden="true">
          {subtitle}
        </p>
      </li>
    );
  }
}
