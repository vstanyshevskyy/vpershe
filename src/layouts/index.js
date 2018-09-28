import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import classNames from 'classnames';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.css';
import '../components/styleguide/index.less';
import Feedback from '../components/feedback';
import Navbar from '../components/Nav';
import Footer from '../components/footer';
import Subscribe from '../components/Subscribe';
import './index.less';

export default ({
  children, location, data: {
    FooterSettings: { edges: [{ node: { frontmatter: footerData } }] },
    NavbarSettings: { edges: [{ node: { frontmatter: navbarSettings } }] },
    HomepageSettings: { edges: [{ node: { frontmatter: homepageSettings } }] }
  }
}) => {
  const wrapperClasses = classNames(
    'page-wrapper',
    {
      'page-wrapper--custom': location.pathname.split('/')[1]
    },
    `page-wrapper--${location.pathname.split('/')[1]}`
  );
  return (
    <div className={wrapperClasses}>
      <Helmet>
        <html lang="uk" />
      </Helmet>
      <Navbar location={location.pathname} className={location.pathname.split('/')[1]} {...navbarSettings} />
      <Feedback
        email={homepageSettings.contactFormEmail}
        title={homepageSettings.contactFormTitle}
      />
      {children()}
      <Subscribe email={homepageSettings.contactFormEmail} className={location.pathname.split('/')[1]} />
      <Footer {...footerData} {...navbarSettings} className={location.pathname.split('/')[1]} />
    </div>
  );
};

export const pageQuery = graphql`
query FooterData {
  FooterSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
    edges{
     node{
       frontmatter{
        contentType
        copyrightText
        bottomLinks {
          url
          text
        }
       }
     }
    }
  }
  NavbarSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "navbar_settings"} }}){
    edges{
     node{
       frontmatter{
        links {
          text
          url
        }
        socialIcons {
          type
          url
        }
       }
     }
    }
  }
  HomepageSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
    edges {
      node {
        frontmatter {
          contactFormEmail
          contactFormTitle
        }
      }
    }
  }
}
`;
