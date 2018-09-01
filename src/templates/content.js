import React from 'react';
import { withPrefix } from 'gatsby-link';
import moment from 'moment';
import './content.less';
import TagsList from '../components/tags';
import SEO from '../components/SEO';

export default props => {
  moment.locale('uk');
  const pageData = Object.assign({}, {
    html: props.pathContext.data.html
  }, props.pathContext.data.frontmatter);
  const settings = props.pathContext.settings;
  return (
    <div className={`index-page__content-wrapper index-page__content-wrapper--${pageData.contentType}`}>
      <SEO {...{ data: settings }} />
      <article>
        { pageData.image
          ? <img className="content__img" src={withPrefix(pageData.image)} alt="" />
          : null }
        <h1 className="content__title">{pageData.title}</h1>
        <div className="content__subtitle">{pageData.subtitle}</div>
        {
          pageData.publishTime
            ? <div className="content__date">{moment(pageData.publishTime).format('LL')}</div>
            : null
        }
        <div className="content__content" dangerouslySetInnerHTML={{ __html: pageData.html }} />
      </article>
      <aside>
        {
          pageData.tags && pageData.tags.length
            ? <TagsList pageName={pageData.contentType} tags={pageData.tags} />
            : null
        }
      </aside>
    </div>
  );
};
