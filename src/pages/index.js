import React, { Fragment } from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import './pages.css';
import './home-page.less';
import Feedback from '../components/Feedback/Feedback';
import SEO from '../components/SEO';
import AvocadoTestImage from './images/avocado.png';

export default function Template ({
  data: {
    articles: { edges: rawArticles },
    settings: { edges: [{ node: { frontmatter: settings } }] }
  }
}) {
  const articles = (rawArticles || []).map(a => ({
    title: a.node.frontmatter.title,
    category: a.node.frontmatter.category,
    path: a.node.frontmatter.path,
    image: a.node.frontmatter.image
  }));
  const avocadoStyle = {
    backgroundImage: `url(${AvocadoTestImage})`
  };
  return (
    <Fragment>
      <SEO defaults={settings} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h2>Фан</h2>
            <Link to="/avocado-test/" className="col-md-12 avocado-item" style={avocadoStyle} />
          </div>
          <div className="col-md-8">
            <h2>Останні дописи</h2>
            <Articles articles={articles} />
          </div>
          <Feedback />
        </div>
      </div>
    </Fragment>
  );
}

const Articles = props => {
  const noArticlesText = 'Ми тільки нещодавно створили сайт і зараз активно працюємо над контентом. Перевірте згодом';
  const articles = props.articles.length ?
    props.articles.map(article => {
      const style = {
        backgroundImage: `url(${withPrefix(article.image)})`
      };
      return (
        <div className="article-item no-overflow" style={style}>
          <h4 className="article-item-title">
            <Link to={`/articles/${article.path}`}>{article.title}</Link>
          </h4>
        </div>);
    })
    : noArticlesText;

  return (
    <div className="article-preview">
      <div className="row articles-wrapper" style={({ width: 320 * articles.length })}>
        {articles}
      </div>
    </div>
  );
};

export const pageQuery = graphql`
query Articles {
  articles: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "articles"} }}){
    edges{
     node{
       frontmatter{
         title
         category
         path
         image
         publishTime
         contentType
       }
     }
    }
  }
  settings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "general_settings"}}}) {
    edges {
      node {
        frontmatter {
          title
          url
          favicon
          metaDescription
          metaKeywords
          fbTitle
          fbImage
          fbDescription
        }
      }
    }
  }
}
`;
