import React from 'react';
import graphql from 'graphql';
import Link from 'gatsby-link';
import './index.less';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import Carousel from '../components/carousel';
import Advice from '../components/advice';
import ArticlesTiles from '../components/articles-tiles';
import ArticlesList from '../components/articles-list';

export default function Template (props) {
  const carouselItems = ((props.data.carouselItems || {}).edges || []).map(c => c.node.frontmatter);
  const stories = ((props.data.stories || {}).edges || []).map(c => c.node.frontmatter);
  const articles = ((props.data.articles || {}).edges || []).map(c => c.node.frontmatter);
  const settings = props.data.settings.edges[0].node.frontmatter;
  const homepageAboutProject = props.data.homepageSettings.edges[0].node.html;
  const subscribeSettings = props.data.subscribeSettings.edges[0].node.frontmatter;
  const advice = ((props.data.advice || {}).edges || []).map(a => a.node.frontmatter);
  return (
    <div>
      <SEO defaults={settings} />
      <Carousel items={carouselItems} />
      <ArticlesTiles items={articles} />
      <div className="homepage__stories">
        <h2 className="homepage__stories-title">Історії</h2>
        <ArticlesList items={stories} />
        <Link to="/stories" className="link__all-records">Всі історії</Link>
      </div>
      <Subscribe
        title={subscribeSettings.title}
        emailPlaceholder={subscribeSettings.email_placeholder}
        emailLabel={subscribeSettings.email_label}
        buttonText={subscribeSettings.button_text}
        thanksTitle={subscribeSettings.thanks_title}
        thanksText={subscribeSettings.thanks_text}
      />
      <div className="homepage__about">
        <h1 className="homepage__about-header">Про проект</h1>
        <div className="homepage__about-text" dangerouslySetInnerHTML={{__html: homepageAboutProject }} />
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
  subscribeSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "subscribe_form_settings"}}}) {
    edges {
      node {
        frontmatter {
          title
          email_placeholder
          email_label
          button_text
          thanks_title
          thanks_text
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
