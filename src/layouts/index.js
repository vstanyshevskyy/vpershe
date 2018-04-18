import React from 'react';
import Helmet from 'react-helmet';
import graphql from 'graphql';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Navbar from '../components/Nav';
import Footer from '../components/footer';

export default ({
  children, location, data:
  { allMarkdownRemark: { edges: [{ node: { frontmatter: footerData } }] } }
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
        location.pathname === '/' ? <Header /> : <Navbar className="row" />
      }
    </div>
    {children()}
    <Footer {...footerData} />
  </div>
);

export const pageQuery = graphql`
query FooterData {
  allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
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
}
`;
