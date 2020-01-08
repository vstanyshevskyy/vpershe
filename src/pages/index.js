import React from 'react';
import { graphql, Link, withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import Carousel from '../components/carousel';
import Advice from '../components/advice';
import ArticlesTiles from '../components/articles-tiles';
import ArticlesList from '../components/articles-list';

export default function Template ({ data }) {
  const stories = ((data.stories || {}).edges || []).map(c => c.node.frontmatter);
  const articles = ((data.articles || {}).edges || []).map(c => c.node.frontmatter);
  const settings = data.settings.edges[0].node.frontmatter;
  const homepageAboutProject = data.homepageSettings.edges[0].node.html;
  const advice = ((data.advice || {}).edges || []).map(a => a.node.frontmatter);
  return (
    <Layout>
      <div id="content">
        <SEO defaults={settings} />
        <Carousel />
        <ArticlesTiles items={articles} />
        <div className="homepage__stories">
          <img className="homepage__graffiti homepage__graffiti--stories-eye graffiti graffiti--eye" loading="lazy" alt="" width="76" src={withPrefix('assets/graffiti/eye.svg')} aria-hidden="true" />
          <h2 className="homepage__stories-title">Історії</h2>
          <ArticlesList items={stories} />
          <img className="homepage__graffiti homepage__graffiti--vpershe graffiti graffiti--vpershe" loading="lazy" alt="" width="241" src={withPrefix('assets/graffiti/vpershe.svg')} aria-hidden="true" />
          <Link to="/stories" className="link__all-records">Всі історії</Link>
        </div>
        <Subscribe />
        <div className="homepage__about">
          <h1 className="homepage__about-header">Про проект</h1>
          <img className="homepage__graffiti homepage__graffiti--about-starts graffiti graffiti--stars" loading="lazy" alt="" width="86" src={withPrefix('assets/graffiti/stars.svg')} aria-hidden="true" />
          <div className="homepage__about-text" dangerouslySetInnerHTML={{ __html: homepageAboutProject }} />
        </div>
        {
          advice && advice.length
            ? (
              <React.Fragment>
                <hr />
                <Advice items={advice} />
              </React.Fragment>
            )
            : null
        }
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
query HomePage {
  homepageSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
    edges {
      node {
        html
        frontmatter {
          contactFormEmail
          contactFormTitle
        }
      }
    }
  }
  stories: allMarkdownRemark(
    filter: { frontmatter:  { contentType: { eq: "stories"} }}
    sort: { fields: [frontmatter___publishTime], order: DESC }
    limit: 4
  ){
    edges{
      node{
        frontmatter {
          title
          contentType
          path
          subtitle
          image {
            childImageSharp {
              fluid(maxWidth: 320, maxHeight: 320) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          image_alt
        }
      }
    }
  }
  articles: allMarkdownRemark(
    filter: { frontmatter:  { contentType: { eq: "articles"} }}
    sort: { fields: [frontmatter___publishTime], order: DESC }
    limit: 2
  ){
    edges{
      node{
        frontmatter {
          title
          contentType
          path
          subtitle
          image {
            relativePath
            childImageSharp {
              fluid(maxWidth: 533, maxHeight: 350) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          image_alt
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
          favicon  {
            relativePath
          }
          metaDescription
          metaKeywords
          fbTitle
          fbImage {
            relativePath
          }
          fbDescription
        }
      }
    }
  }
  advice: allMarkdownRemark(
    filter: { frontmatter:  { contentType: { eq: "advice"}}}
    limit: 10
  ) {
    edges {
      node {
        frontmatter {
          title
          url
        }
      }
    }
  }
}
`;
