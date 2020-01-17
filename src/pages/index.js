import React from 'react';
import { graphql, Link, withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import Carousel from '../components/carousel';
import RecentAdviceList from '../components/recent-advice-list';
import ArticlesTiles from '../components/articles-tiles';
import RecentStories from '../components/recent-stories';
import AboutProject from '../components/about-project';

export default function Template ({ data }) {
  const articles = ((data.articles || {}).edges || []).map(c => c.node.frontmatter);
  return (
    <Layout>
      <div id="content">
        <SEO />
        <Carousel />
        <ArticlesTiles items={articles} />
        <img className="homepage__graffiti homepage__graffiti--eye" loading="lazy" alt="" width="76" src={withPrefix('assets/graffiti/eye.svg')} aria-hidden="true" />
        <RecentStories />
        <div className="homepage__graffiti-wrapper">
          <img className="homepage__graffiti homepage__graffiti--vpershe" loading="lazy" alt="" width="241" src={withPrefix('assets/graffiti/vpershe.svg')} aria-hidden="true" />
        </div>
        <Subscribe />
        <AboutProject />
        <hr />
        <RecentAdviceList />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
query HomePage {
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
