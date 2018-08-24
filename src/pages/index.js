import React from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import './pages.css';
import './home-page.less';
import Feedback from '../components/Feedback';
import SEO from '../components/SEO';
import ArticlesCards from '../components/articles-cards';

const getQuizBlock = ({ quizTitle, quizCta }) => (
  <div className="avocado-test-link">
    <h2>{quizTitle}</h2>
    <Link to="/avocado-test/" className="avocado-test__image-link">
      <img src="/assets/uploads/avocado-running.gif" alt="Веселе авокадо біжить проходити тест" />
    </Link>
    <Link to="/avocado-test/" className="btn btn-primary">
      {quizCta}
    </Link>
  </div>
);

export default function Template ({
  data: {
    articles: { edges: rawArticles },
    settings: { edges: [{ node: { frontmatter: settings } }] },
    homepageSettings: { edges: [{ node: { frontmatter: homepageSettings } }] }
  }
}) {
  moment.locale('uk');

  const articles = (rawArticles || []).map(a => a.node.frontmatter);
  const latestArticles = articles.slice(0, homepageSettings.latestArticlesCount);
  const otherArticles = articles.slice(
    homepageSettings.latestArticlesCount,
    homepageSettings.otherArticlesCount
  );
  return (
    <div>
      <SEO defaults={settings} />
      <div className="container-fluid latest-articles-container">
        <Row>
          <h2 className="latest-articles-title">
            <strong>{homepageSettings.latestArticlesHeader}</strong>
          </h2>
          { latestArticles.map((article, index) => {
            const style = {
              backgroundImage: `url(${withPrefix(article.image)})`
            };
            return (
              <Col key={index} xs={12} md={12 / homepageSettings.latestArticlesCount} className="article-container">
                <article className="snax-list">
                  <figure className="entry-featured-media" style={style}>
                    <Link to={`/articles/${article.path}`} />
                  </figure>
                  <header className="article-header">
                    <h3 className="article-title">
                      <Link to={`/articles/${article.path}`}>{article.title}</Link>
                    </h3>
                  </header>
                </article>
              </Col>
            );
          }) }
        </Row>
      </div>
      <div className="container-fluid other-articles">
        <Row className="d-block d-sm-none quiz-container-mobile">
          <Col xs={12}>
            {getQuizBlock(homepageSettings)}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            { otherArticles.length ?
              <div>
                <ArticlesCards
                  titleText={homepageSettings.otherArticlesHeader}
                  articles={otherArticles}
                  useVerticalLayout
                  articleClassNames="col-xs-12 col-md-6"
                />
                <Link to="/archive">{homepageSettings.seeAllArticlesText}</Link>
              </div> :
              null }
          </Col>
          <Col xs={12} md={4} className="sidebar">
            <div className="d-none d-sm-block">
              {getQuizBlock(homepageSettings)}
            </div>
            <div className="feedback-form">
              <div className="envelope-icon">
                <FaEnvelope />
              </div>
              <h2>{homepageSettings.contactFormTitle}</h2>
              <Feedback
                email={homepageSettings.contactFormEmail}
                buttonText={homepageSettings.contactFormCta}
              />
              <div className="will-not-spam">
                {homepageSettings.contactFormBottomText}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
query Articles {
  articles: allMarkdownRemark(
    filter: { frontmatter:  { contentType: { eq: "articles"} }}
    sort: { fields: [frontmatter___publishTime], order: DESC }
  ){
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
  homepageSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
    edges {
      node {
        frontmatter {
          latestArticlesCount
          otherArticlesCount
          latestArticlesHeader
          otherArticlesHeader
          quizTitle
          quizCta
          contactFormEmail
          contactFormTitle
          contactFormBottomText
          contactFormCta
          seeAllArticlesText
        }
      }
    }
  }
}
`;
