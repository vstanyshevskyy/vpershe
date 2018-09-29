import React from 'react';
import { withPrefix } from 'gatsby-link';
import moment from 'moment';
import './content.less';
import TagsList from '../components/tags';
import ArticleCard from '../components/article-card';
import RelatedLinks from '../components/realted-links';
import SEO from '../components/SEO';

const getRelatedArticlesBottom = items => {
  if (!items.length) return null;
  return (
    <div className="content__related-items-bottom">
      <h5 className="content__related-items-bottom-title">Схожі матеріали</h5>
      <ul className="content__related-items-bottom-list">
        { items.map(item => {
          return (
            <ArticleCard
              url={item.path}
              title={item.title}
              subtitle={item.subtitle}
              image={item.list_image_articles || item.list_image}
              image_alt={item.list_image_alt}
              contentType={item.contentType}
            />
          );})
        }
      </ul>
    </div>
  );
};

export default props => {
  moment.locale('uk');
  const pageData = Object.assign({}, {
    html: props.pathContext.data.html
  }, props.pathContext.data.frontmatter);
  const settings = props.pathContext.settings;
  const relatedBottom = (pageData.related_bottom || []).map(c => c.node.frontmatter);
  return (
    <div className={`index-page__content-wrapper index-page__content-wrapper--${pageData.contentType}`}>
      <SEO {...{ data: settings }} />
      <article className="content__article">
        { pageData.image
          ? <img className="content__img" src={withPrefix(pageData.image)} alt="" />
          : null }
        <div className="content__article-head">
          <h1 className="content__title">{pageData.title}</h1>
          <div className="content__subtitle">{pageData.subtitle}</div>
          {
            pageData.publishTime
              ? <div className="content__date">{moment(pageData.publishTime).format('LL')}</div>
              : null
          }
        </div>
        <div className="content__article-wrapper">
          <div className="content__content" dangerouslySetInnerHTML={{ __html: pageData.html }} />
          <aside className="content__sidebar">
            {
              pageData.related_sidebar && pageData.related_sidebar.length
                ? <RelatedLinks links={pageData.related_sidebar} />
                : null
            }
          </aside>
        </div>
      </article>
      <aside>
        {
          pageData.tags && pageData.tags.length
            ? <TagsList pageName={pageData.contentType} tags={pageData.tags} />
            : null
        }
        { getRelatedArticlesBottom(relatedBottom) }
      </aside>

    </div>
  );
};
