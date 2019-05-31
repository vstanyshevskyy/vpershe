/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactDOM from 'react-dom';
import { withPrefix } from 'gatsby';
import moment from 'moment';
import 'moment/locale/uk';
import Config from '../config';
import './content.less';
import Layout from '../layouts';
import TagsList from '../components/tags';
import ArticlesList from '../components/articles-list';
import Sidebar from '../components/article-sidebar';
import SEO from '../components/SEO';

export default class Content extends React.Component {
  constructor() {
    super();
    this.renderRelatedArticles = this.renderRelatedArticles.bind(this);
    this.makeLinksOpenInNewTab = this.makeLinksOpenInNewTab.bind(this);
    this.insertMobileSidebar = this.insertMobileSidebar.bind(this);
  }

  componentDidMount = () => {
    this.mountAddThis();
    this.makeLinksOpenInNewTab();
    this.insertMobileSidebar();
  }

  mountAddThis = () => {
    const script = document.createElement('script');
    script.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${Config.addThis.id}`;
    script.async = true;
    document.body.appendChild(script);
  }

  makeLinksOpenInNewTab() {
    this.contentNode.querySelectorAll('a').forEach(el => {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  insertMobileSidebar() {
    const paragraph = document.querySelectorAll('.content__content p')[this.relatedSidebarMobilePosition || 4];
    if (!paragraph) {
      return;
    }
    const container = document.createElement('div');
    paragraph.parentNode.insertBefore(container, paragraph.nextSibling);
    ReactDOM.render(<Sidebar
      relatedLinks={this.asideRelatedLinks}
      elatedLinksTitle={this.relatedSidebarMobileTitle}
      isMobile
    />,
    container);
  }

  renderRelatedArticles = items => {
    if (!items.length) return null;
    const articles = items.map(i => {
      i.list_image = i.list_image_articles || i.list_image;
      return i;
    });
    return (
      <div className="content__related-items-bottom">
        <h5 className="content__related-items-bottom-title">Схожі матеріали</h5>
        <ArticlesList items={articles} />
      </div>
    );
  }

  render() {
    moment.locale('uk');
    const { pageContext } = this.props;
    const pageData = Object.assign({}, {
      html: pageContext.data.html
    }, pageContext.data.frontmatter);
    const { settings, globalSettings } = pageContext;
    const relatedBottom = (pageData.related_bottom || []);
    this.asideRelatedLinks = (pageData.related_sidebar || []).map(item => ({
      url: `/${item.contentType}/${item.path}`,
      title: item.title
    }));
    this.relatedSidebarMobilePosition = pageData.relatedSidebarMobilePosition || 4;
    this.relatedSidebarMobileTitle = pageData.relatedSidebarMobileTitle || '';
    const seoData = Object.assign({}, settings, { image: pageData.image });
    return (
      <Layout>
        <div className={`index-page__content-wrapper index-page__content-wrapper--${pageData.contentType}`}>
          <SEO {...{ data: seoData, defaults: globalSettings, isBlogPost: true }} />
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
              <div
                className="content__content"
                dangerouslySetInnerHTML={{ __html: pageData.html }}
                ref={c => { this.contentNode = c; }}
              />
              <Sidebar relatedLinks={this.asideRelatedLinks} />
            </div>
          </article>
          <aside>
            <div className="content__tags-social-container">
              {
                pageData.tags && pageData.tags.length
                  ? <TagsList pageName={pageData.contentType} tags={pageData.tags} />
                  : null
              }
            </div>
            { this.renderRelatedArticles(relatedBottom) }
          </aside>

        </div>
      </Layout>
    );
  }
}
