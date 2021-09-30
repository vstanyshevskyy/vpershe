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
      settings: { edges: settings }
    },
    pageContext: {
      currentPage,
      numPages,
      tag,
      tags,
      category,
      pathPrefix
    }
  } = props;
  const contentTypeSettings = settings.find(s => s.node.frontmatter.contentType === `${category}_settings`).node.frontmatter;
  if (tag) {
    Object.keys(contentTypeSettings).forEach(key => {
      contentTypeSettings[key] = contentTypeSettings[key].replace(/{{tag}}/gi, tag);
    });
  }
  const url = `${pathPrefix}${currentPage === 1 ? '' : `/${currentPage}`}`;
  const seoData = Object.assign({}, contentTypeSettings, { url });

  return (
    <Layout>
      <main className={`index-page__content-wrapper index-page__content-wrapper--${category}`} id="content">
        <SEO data={seoData} />
        <div className="list-with-tags">
          <ul className={`index-page__list index-page__list--${category}`}>
            { children }
          </ul>
          <div className={`tags-list tags-list--${category}`}>
              <TagsList
                pageName={category}
                current={tag}
                tags={tags}
              />
          </div>
        </div>
        <hr className={`hr hr--${category} hr--pagination`} />
        <Pagination pages={numPages} current={currentPage} prefix={category} />
      </main>
    </Layout>
  );
};
