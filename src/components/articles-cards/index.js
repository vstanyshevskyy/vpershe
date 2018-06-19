import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';
import './index.less';

export default props => (
  <aside className={`articles-cards-list ${props.useVerticalLayout ? 'articles-cards-list--vertical' : ''}`}>
    <h2 className="category-title">
      <span>{props.titlePrefix}
        {
          props.titleLink ?
            <Link to={props.titleLink}>{props.titleText}</Link> :
            props.titleText
        }
      </span>
    </h2>
    <div className="collection">
      <div className="collection-viewport">
        <ul className="category-items">
          { (props.articles || []).map((article, index) => (
            <li key={index} className={`category-item ${props.articleClassNames}`}>
              <article>
                <figure className="item-featured-media">
                  <Link className="frame" to={`/articles/${article.path}`}>
                    <img alt={article.title} src={article.image} />
                  </Link>
                </figure>
                <div className="category-item-body">
                  <header className="category-item-header">
                    <h3 className="category-item-title">
                      <Link to={`/articles/${article.path}`} rel="bookmark">
                        {article.title}
                      </Link>
                    </h3>
                  </header>
                  <footer>
                    <time
                      className="category-item-date"
                      dateTime={moment(article.publishTime).format('YYYY-MM-DDTHH:mm:ss')}
                      title={moment(article.publishTime).format('MMM DD, YYYY, hh:mm')}
                    >
                      {moment(article.publishTime).fromNow()}
                    </time>
                  </footer>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </aside>
);
