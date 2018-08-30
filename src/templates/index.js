import React from 'react';
import moment from 'moment';
import './index.less';
import TagsList from '../components/tags';
import Pagination from '../components/pagination';
import ArticleCard from '../components/article-card';
import SEO from '../components/SEO';

function getAdviceList(group) {
  return group.map(g => (
    <li id={g.node.frontmatter.url} className="article-card article-card--advice">
      <h3 className="article-card__title article-card__title--advice">
        { g.node.frontmatter.title }
      </h3>
      <div className="article-card__content" dangerouslySetInnerHTML={{ __html: g.node.html }} />
    </li>
  ));
}
function getArticlesList(group, contentType) {
  return group.map(g => {
    const url = `/${contentType}/${g.node.frontmatter.path}`;
    return (
      <ArticleCard
        url={url}
        title={g.node.frontmatter.title}
        subtitle={g.node.frontmatter.subtitle}
        image={g.node.frontmatter.list_image}
        image_alt={g.node.frontmatter.list_image_alt}
        contentType={contentType}
      />
    );
  });
}

function getItems(contentType, group) {
  switch (contentType) {
  case 'advice':
    return getAdviceList(group);
  case 'articles':
    return getArticlesList(group, contentType);
  case 'stories':
    return getArticlesList(group, contentType);
  case 'sexoteca':
    return getArticlesList(group, contentType);
  default:
    return null;
  }
}
export default props => {
  const {
    group, index, pageCount
  } = props.pathContext;
  const contentType = props.pathContext.pathPrefix.split('/')[0];
  const allTags = props.pathContext.additionalContext.tags;
  const settings = props.pathContext.additionalContext.settings;
  moment.locale('uk');

  return (
    <main className={`index-page__content-wrapper index-page__content-wrapper--${contentType}`}>
      <SEO {...{ data: settings }} />
      <ul className={`index-page__list index-page__list--${contentType}`}>
        <div className={`article-card article-card--tags article-card--tags-${contentType}`}>
          {allTags.length
            ? <TagsList
              pageName={contentType}
              current={props.pathContext.additionalContext.tag}
              tags={allTags}
            />
            : null}
        </div>
        { getItems(contentType, group) }
      </ul>
      <hr className={`hr hr--${contentType} hr--pagination`} />
      <Pagination pages={pageCount} current={index} prefix={contentType} />
    </main>
  );
};
