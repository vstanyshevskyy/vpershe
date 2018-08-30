import React from 'react';
import graphql from 'graphql';
import moment from 'moment';
import './index.less';
import SEO from '../components/SEO';
import Subscribe from '../components/Subscribe';
import Carousel from '../components/carousel';
import Advice from '../components/advice';
import ArticlesTiles from '../components/articles-tiles';
import ArticlesList from '../components/articles-list';

export default function Template ({
  data: {
    carouselItems: {edges: carouselItemsRaw},
    stories: { edges: rawStories },
    articles: { edges: rawArticles },
    advice: { edges: rawAdvice },
    settings: { edges: [{ node: { frontmatter: settings } }] },
    homepageSettings: { edges: [{ node: homepageSettings }] }
  }
}) {
  const carouselItems = carouselItemsRaw.map(c => c.node.frontmatter);
  const stories = rawStories.map(c => c.node.frontmatter);
  const articles = rawArticles.map(c => c.node.frontmatter);
  moment.locale('uk');
  const advice = rawAdvice.map(a => a.node.frontmatter);
  return (
    <div>
      <SEO defaults={settings} />
      <Carousel items={carouselItems} />
      <div className="homepage__about">
        <h1 className="homepage__about-header highlighted">Про Проект</h1>
        <div className="homepage__about-text" dangerouslySetInnerHTML={{__html: homepageSettings.html}} />
      </div>
      <hr />
      <div className="homepage__stories">
        <h2 className="homepage__stories-title highlighted">Історії</h2>
        <ArticlesList items={stories} />
      </div>
      <Subscribe email={homepageSettings.contactFormEmail} />
      <ArticlesTiles items={articles} />
      <Advice items={advice} />
    </div>
  );
}

export const pageQuery = graphql`
query HomePage {
  carouselItems: allMarkdownRemark(
    filter: { frontmatter:  { carousel_featured: { eq: true} }}
    sort: { fields: [frontmatter___publishTime], order: DESC }
  ){
    edges{
      node{
        frontmatter {
          title
          contentType
          path
          subtitle
          carousel_image
          carousel_image_alt
        }
      }
    }
  }
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
  ){
    edges{
      node{
        frontmatter {
          title
          contentType
          path
          subtitle
          list_image
          list_image_alt
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
          list_image
          list_image_alt
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
  advice: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "advice"}}}) {
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
