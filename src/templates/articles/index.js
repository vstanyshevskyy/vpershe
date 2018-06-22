import React from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import moment from 'moment';
import Breadcrumbs from '../../components/breadcrumbs';

import './index.less';
import ArticlesCards from '../../components/articles-cards';
import SEO from '../../components/SEO';

export default function Template ({
  pathContext: {
    slug: articlePath,
    settings,
    path,
    parentUrl
  },
  data: { allArticles: { articles: allArticles } }
}) {
  const articleData = allArticles.filter(a => a.article.data.path === articlePath)[0];
  moment.locale('uk');
  const post = Object.assign(
    {
      html: articleData.article.html,
      next: articleData.next ? articleData.next.data : null,
      previous: articleData.previous ? articleData.previous.data : null
    },
    ...articleData.article.data
  );
  const moreFromCategory = allArticles.filter(a =>
    a.article.data.category === post.category
    && a.article.data.title !== post.title
    && (post.next && post.next.title !== a.article.data.title)
    && (post.previous && post.previous.title !== a.article.data.title))
    .map(a => a.article.data);
  const seoData = {
    title: post.title,
    image: post.image,
    metaKeywords: post.metaKeywords,
    metaDescription: post.metaDescription,
    publishTime: post.publishTime,
    url: path,
    parentUrl
  };
  return (
    <div className="container">
      <SEO data={seoData} isBlogPost defaults={settings} />
      <div className="row article" role="main">
        <Breadcrumbs links={[{ text: 'Статті', url: '/articles' }, { text: post.title }]} />
        <article className="col-sm-12 col-lg-8" itemScope itemType="http://schema.org/Article">
          <header>
            <div className="article-category-container">
              <Link to={`/categories/${post.category}`} className="square-link">
                <span itemProp="articleSection">{post.category}</span>
              </Link>
            </div>
            <h1 itemProp="headline">{post.title}</h1>
            { post.subtitle && post.subtitle.length
              ? <h2 className="subtitle" itemProp="description">{post.subtitle}</h2>
              : null
            }
          </header>
          {
            post.image ?
              <figure className="featured-image" itemProp="image" itemScope="" itemType="http://schema.org/ImageObject">
                <img src={withPrefix(post.image)} alt={post.title} />
                <meta itemProp="url" content={withPrefix(post.image)} />
                <meta itemProp="width" content="1600" />
                <meta itemProp="height" content="900" />
              </figure> :
              null
          }
          <div className="article-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.html }} />
          {
            post.tags && post.tags.length ?
              <div className="tags-container">Теги: {
                (post.tags || []).map((tag, index) =>
                  (<Link key={index} className="square-link" to={`/tags/${tag}`}>{tag}</Link>)) }
              </div> :
              null
          }
          <nav className="prev-next-article">
            <div className="prev-next-inner">
              <p className="prev-next-block-label">Читайте також</p>
              <ul className="prev-next-links">
                {
                  post.previous ?
                    <li className="prev-next-link-prev">
                      <Link to={`/articles/${post.previous.path}`} rel="prev">
                        <strong>Попередня стаття</strong>
                        <span className="g1-gamma g1-gamma-1st">{post.previous.path}</span>
                      </Link>
                    </li> :
                    null
                }
                {
                  post.next ?
                    <li className="prev-next-link-next">
                      <Link to={`/articles/${post.next.path}`} rel="next">
                        <strong>Наступна стаття</strong>
                        <span className="g1-gamma g1-gamma-1st">{post.next.title}</span>
                      </Link>
                    </li> :
                    null
                }
              </ul>
            </div>
          </nav>
          { moreFromCategory.length ?
            <ArticlesCards
              titlePrefix="Більше про: "
              titleLink={`/categories/${post.category}`}
              titleText={post.category}
              articles={moreFromCategory}
            />
            : null }

        </article>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query Articles1 {
    allArticles: allMarkdownRemark(
      filter: {frontmatter: { contentType: { eq: "articles" }} }
        ) {
      articles: edges{
        next {
          data: frontmatter {
            title
            path
          }
        }
        previous {
          id
          data: frontmatter {
            title
            path
          }
        }
        article: node{
          html
          data: frontmatter {
            title
            contentType
            parent
            path
            subtitle
            image
            category
            publishTime
            metaKeywords
            metaDescription
          }
        }
      }
    }
  }
`;
