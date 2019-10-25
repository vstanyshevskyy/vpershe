import React from 'react';
import './index.less';
import Layout from '../layouts';
import TagsList from '../components/tags';
import Pagination from '../components/pagination';
import SEO from '../components/SEO';

export default props => {
  const {
    children,
    data: {
      settings: { edges: settings },
      generalSettings: {
        edges: [{
          node: {
            frontmatter: generalSettings
          }
        }]
      }
    },
    pageContext: {
      currentPage,
      numPages,
      tag,
      tags,
      contentType,
      pathPrefix
    }
  } = props;
  const contentTypeSettings = settings.find(s => s.node.frontmatter.contentType === `${contentType}_settings`).node.frontmatter;
  if (tag) {
    Object.keys(contentTypeSettings).forEach(key => {
      contentTypeSettings[key] = contentTypeSettings[key].replace(/{{tag}}/gi, tag);
    });
  }
  const url = `${pathPrefix}${currentPage === 1 ? '' : `/${currentPage}`}`;
  const seoData = Object.assign({}, contentTypeSettings, { url });

  return (
    <Layout>
      <main className={`index-page__content-wrapper index-page__content-wrapper--${contentType}`} id="content">
        <SEO {...{ data: seoData, defaults: generalSettings }} />
        <ul className={`index-page__list index-page__list--${contentType}`}>
          <div className={`article-card article-card--tags article-card--tags-${contentType}`}>
            {tags.length
              ? (
                <TagsList
                  pageName={contentType}
                  current={tag}
                  tags={tags}
                />
              )
              : null}
          </div>
          { children }
        </ul>
        <hr className={`hr hr--${contentType} hr--pagination`} />
        <Pagination pages={numPages} current={currentPage} prefix={contentType} />
      </main>
    </Layout>
  );
};
