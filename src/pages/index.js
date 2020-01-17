import React from 'react';
import { graphql, Link, withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import Carousel from '../components/carousel';
import RecentAdviceList from '../components/recent-advice-list';
import ArticlesTiles from '../components/articles-tiles';
import ArticlesList from '../components/articles-list';
import AboutProject from '../components/about-project';

export default function Template ({ data }) {
  const stories = ((data.stories || {}).edges || []).map(c => c.node.frontmatter);
  const articles = ((data.articles || {}).edges || []).map(c => c.node.frontmatter);
  const advice = ((data.advice || {}).edges || []).map(a => a.node.frontmatter);
  return (
    <Layout>
      <div id="content">
        <SEO />
        <Carousel />
        <ArticlesTiles items={articles} />
        <img className="homepage__graffiti homepage__graffiti--eye" loading="lazy" alt="" width="76" src={withPrefix('assets/graffiti/eye.svg')} aria-hidden="true" />
        <div className="homepage__stories">
          <h2 className="homepage__stories-title">Історії</h2>
          <ArticlesList items={stories} />
          <Link to="/stories" className="link__all-records">Всі історії</Link>
        </div>
        <div className="homepage__graffiti-wrapper">
          <img className="homepage__graffiti homepage__graffiti--vpershe" loading="lazy" alt="" width="241" src={withPrefix('assets/graffiti/vpershe.svg')} aria-hidden="true" />
        </div>
        <Subscribe />
        <AboutProject />
        <hr />
        <RecentAdviceList items={advice} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
query HomePage {
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
}
`;
