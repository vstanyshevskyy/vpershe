/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { getUniqueId, CardClickHelper } from '../../helpers';
import { categories } from '../../config'
import './index.less';

const getCategoryName = (category) => {
  return categories.find(c => c.value === category).label;
}

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);

    this.clickHelper = new CardClickHelper();
  }

  render() {
    const {
      url, image, category, title, subtitle, type
    } = this.props;
    console.log(this.props)
    const uid = getUniqueId(url);
    const subtitleClassName = 'article-card__subtitle';
    const textUid = `${subtitleClassName}-${uid}`;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={`article-card article-card--${type}`}
        onMouseUp={e => this.clickHelper.onMouseUp(e)}
        onMouseDown={e => this.clickHelper.onMouseDown(e)}
      >
        <Img alt="" className="article-card__image" fluid={type ? this.props[`image_${type}`].childImageSharp.fluid : image.childImageSharp.fluid} />
        <div className="article-card__text">
          <span className="article-card__category">{getCategoryName(category)}</span>
          <Link
            className={`article-card__title article-card__title--${category}`}
            ref={el => this.clickHelper.addLink(el)}
            aria-describedby={textUid}
            to={url}
          >
            {title}
          </Link>
        </div>
      </li>
    );
  }
}
