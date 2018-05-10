import React from 'react';
import Helmet from 'react-helmet';
import graphql from 'graphql';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Navbar from '../components/Nav';
import Footer from '../components/footer';

export default ({
  children, location, data: {
    FooterSettings: { edges: [{ node: { frontmatter: footerData } }] },
    NavbarSettings: { edges: [{ node: { frontmatter: navbarSettings } }] }
  }
}) => (
  <div>
    <div className="container-fluid">
      <Helmet
        title="Vpershe Site"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' }
        ]}
      />
      {
        location.pathname === '/' ? <Header {...navbarSettings} /> : <Navbar className="row" {...navbarSettings} />
      }
    </div>
    {children()}
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
}
`;
