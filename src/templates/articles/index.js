import React from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import Breadcrumbs from '../../components/breadcrumbs';

import './index.less';

// TODO:
/*
  4. More from Category
*/

export default function Template ({
  pathContext: { slug: articlePath },
  data: { allArticles: { articles: allArticles } }
}) {
  const articleData = allArticles.filter(a => a.article.data.path === articlePath)[0];
  const post = Object.assign(
    {
      html: articleData.article.html,
      next: articleData.next ? articleData.next.data : null,
      previous: articleData.previous ? articleData.previous.data : null
    },
    ...articleData.article.data
  );

  return (
    <div className="container">
      <div className="row article" role="main">
        <Breadcrumbs links={[{ text: 'Статті', url: '/articles' }, { text: post.title }]} />
        <article className="col-8" itemScope itemType="http://schema.org/Article">
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
          }
        }
      }
    }
  }
`;
