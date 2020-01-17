import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { CardClickHelper } from '../../helpers';
import './index.less';

export default class ArticleTiles extends React.Component {
  constructor(props) {
    super(props);

    this.clickHelper = new CardClickHelper();
  }

  render() {
    const { items } = this.props;
    return (
      <div className="articles-tiles">
        <h2>Статті</h2>
        <ul className="articles-tiles__list">
          {
            items.map(({ path, image, title }, index) => {
              const url = `/articles/${path}`;
              return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={url}
                  className="article-tiles__article"
                  onMouseUp={e => this.clickHelper.onMouseUp(e, index)}
                  onMouseDown={e => this.clickHelper.onMouseDown(e)}
                >
                  <div className="article-tiles__article-wrapper">
                    <Img alt="" className="article-tiles__article-image" fluid={image.childImageSharp.fluid} />
                    <Link to={url} ref={el => this.clickHelper.addLink(el, index)} className="article-tiles__article-link">{title}</Link>
                  </div>
                </li>
              );
            })
          }
        </ul>
        <Link to="/articles" className="link__all-records">Всі статті</Link>
      </div>
    );
  }
}
