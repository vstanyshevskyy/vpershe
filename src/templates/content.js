/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactDOM from 'react-dom';
import { graphql } from 'gatsby';
import moment from 'moment';
import 'moment/locale/uk';
import classNames from 'classnames';
import Config from '../config';
import './content.less';
import Layout from '../layouts';
import ThemeContext from '../context/ThemeContext';
import NonStrechedImage from '../components/NonStrechedImage';
import TagsList from '../components/tags';
import ArticlesList from '../components/articles-list';
import Sidebar from '../components/article-sidebar';
import SEO from '../components/SEO';

const prepareRelatedContent = (input, allContent) => {
  const PATH_REPLACE_REGEX = /https?:\/\/(?:www.)?vpershe.(?:netlify.)?com\/(?:articles|stories|sexoteca)\//gi;
  return (input || [])
    .map(({ path }) => {
      if (!path) {
        return null;
      }
      const filteredPath = path.replace(PATH_REPLACE_REGEX, '');
      const item = allContent.find(content => content.path === filteredPath);
      return item;
    }).filter(el => el);
};

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
    return (
      <div className="content__related-items-bottom">
        <h5 className="content__related-items-bottom-title">Схожі матеріали</h5>
        <ArticlesList items={items} />
      </div>
    );
  }

  render() {
    moment.locale('uk');
    const { data: {
      page: {
        html,
        frontmatter: {
          related_bottom,
          related_sidebar,
          relatedSidebarMobilePosition,
          relatedSidebarMobileTitle,
          image,
          imageAlt,
          title,
          subtitle,
          publishTime,
          tags,
          metaKeywords,
          metaDescription,
          path
        }
      },
      allPages
    }, pageContext: {
      contentType
    }} = this.props;

    const { isDarkModeEnabled } = this.context;

    const relatedBottom = prepareRelatedContent(related_bottom, allPages.edges.map(n => n.node.frontmatter));
    const relatedSidebar = prepareRelatedContent(related_sidebar, allPages.edges.map(n => n.node.frontmatter));
    this.asideRelatedLinks = (relatedSidebar || []).map(item => ({
      url: `/${item.contentType}/${item.path}`,
      title: item.title
    }));
    this.relatedSidebarMobilePosition = relatedSidebarMobilePosition || 4;
    this.relatedSidebarMobileTitle = relatedSidebarMobileTitle || '';
    const seoData = Object.assign({ title, metaKeywords, metaDescription, useTitleTemplate: true, url: `${contentType}/${path}`, image });
    const className = classNames(
      'index-page__content-wrapper',
      `index-page__content-wrapper--${contentType}`,
      {
        'index-page__content-wrapper--dark': isDarkModeEnabled
      }
    );
    return (
      <Layout>
        <div className={className} id="content">
          <SEO data={seoData} isBlogPost />
          <article className="content__article">
            { image
              ? <NonStrechedImage alt={imageAlt} className="article-card__image" fluid={image.childImageSharp.fluid} />
              : null }
            <div className="content__article-head">
              <h1 className="content__title">{title}</h1>
              <div className="content__subtitle">{subtitle}</div>
              {
                publishTime
                  ? (
                    <div className={classNames('content__date', { 'content__date--dark': isDarkModeEnabled })}>
                      {moment(publishTime).format('LL')}
                    </div>
                  )
                  : null
              }
            </div>
            <div className="content__article-wrapper">
              <div
                className="content__content"
                dangerouslySetInnerHTML={{ __html: html }}
                ref={c => { this.contentNode = c; }}
              />
              <Sidebar relatedLinks={this.asideRelatedLinks} />
            </div>
          </article>
          <aside>
            <div className="content__tags-social-container">
              {
                tags && tags.length
                  ? <TagsList pageName={contentType} tags={tags} />
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

Content.contextType = ThemeContext;

export const pageQuery = graphql`
  query contentQuery($slug: String!, $contentType: String!) {
    page: markdownRemark(
      frontmatter: {
        path: { eq: $slug }
        contentType: { eq: $contentType }
      }
    ) {
      html
      frontmatter {
        path
        related_bottom {
          path
        }
        related_sidebar{
          path
        }
        relatedSidebarMobilePosition
        relatedSidebarMobileTitle
        image {
          relativePath
          childImageSharp {
            fluid(maxHeight: 1160) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
        }
        imageAlt: image_alt
        title
        subtitle
        publishTime
        tags
        metaKeywords
        metaDescription
      }
    }
    allPages: allMarkdownRemark(
      filter: {
        frontmatter: {
          contentType: { in: ["articles", "stories", "sexoteca"] }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            contentType
            image {
              childImageSharp {
                fluid(maxWidth: 320, maxHeight: 320, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            imageAlt: image_alt
            title
            subtitle
          }
        }
      }
    }
  }
`;
