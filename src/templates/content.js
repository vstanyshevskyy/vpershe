import React from 'react';
import { withPrefix } from 'gatsby-link';
import moment from 'moment';
import 'moment/locale/uk';
import Config from '../config';
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
          ); })
        }
      </ul>
    </div>
  );
};

export default class Content extends React.Component {
  componentDidMount = () => {
    this.mountAddThis();
  }
  mountAddThis = () => {
    const script = document.createElement('script');
    script.src =
      `//s7.addthis.com/js/300/addthis_widget.js#pubid=${Config.addThis.id}`;
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    moment.locale('uk');
    const pageData = Object.assign({}, {
      html: this.props.pathContext.data.html
    }, this.props.pathContext.data.frontmatter);
    const settings = this.props.pathContext.settings;
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
          <div className="content__tags-social-container">
            {
              pageData.tags && pageData.tags.length
                ? <TagsList pageName={pageData.contentType} tags={pageData.tags} />
                : null
            }
            <div className="content__addthis addthis_inline_share_toolbox" />
          </div>
          { getRelatedArticlesBottom(relatedBottom) }
        </aside>

      </div>
    );
  }
}
