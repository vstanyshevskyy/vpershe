import React from 'react';
import graphql from 'graphql';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.css';
import '../components/styleguide/index.less';
import Feedback from '../components/Feedback';
import Navbar from '../components/Nav';
import Footer from '../components/footer';

export default ({
  /* children, */ data: {
    FooterSettings: { edges: [{ node: { frontmatter: footerData } }] },
    NavbarSettings: { edges: [{ node: { frontmatter: navbarSettings } }] },
    HomepageSettings: { edges: [{ node: { frontmatter: homepageSettings } }] }
  }
}) => (
  <div>
    <Navbar {...navbarSettings} />
    <Feedback
      email={homepageSettings.contactFormEmail}
      buttonText={homepageSettings.contactFormCta}
    />
    {/* {children()} */}
    <Footer {...footerData} {...navbarSettings} />
  </div>
);

export const pageQuery = graphql`
query FooterData {
  FooterSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
    edges{
     node{
       frontmatter{
        contentType
        blocks {
          title
          content
        }
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
          contactFormBottomText
          contactFormCta
        }
      }
    }
  }
}
`;
