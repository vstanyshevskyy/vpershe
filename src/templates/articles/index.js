import React from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import Breadcrumbs from '../../components/breadcrumbs';

import './index.less';

export default function Template ({ data }) {
  const post = data.markdownRemark.frontmatter;
  const image = post.image ? <img src={withPrefix(post.image)} alt={post.title} className="img-thumbnail" /> : null;

  return (
    <div>
      <Breadcrumbs links={[{ text: 'Статті', url: '/articles' }, { text: post.title }]} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>{post.title}</h1>
            {image}
            <div className="col-gray">Категорія: <Link to={`/categories/${post.category}`}>{post.category}</Link></div>
            <div className="col-gray">Теги: {
              (post.tags || []).map((tag, index) => (<span key={index}>{!!index && ', '}<Link to={`/tags/${tag}`}>{tag}</Link></span>))
            }
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query ArticleByPath($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        path
        category
        title
        image
        tags
      }
    }

    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
            path
          }
        }
      }
    }
  }
`;
