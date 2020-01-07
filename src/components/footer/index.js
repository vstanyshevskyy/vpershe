import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ThemeContext from '../../context/ThemeContext';
import Footer from './FooterDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        footer: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
          edges{
            node{
              frontmatter{
                copyrightText
                bottomLinks {
                  url
                  text
                }
              }
            }
          }
        }
        navigation: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "navbar_settings"} }}){
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
    `}
    render={(
      {
        footer: { edges: [{ node: { frontmatter: { bottomLinks, copyrightText } } }] },
        navigation: { edges: [{ node: { frontmatter: { links, socialIcons } } }] }
      }
    ) => (
      <ThemeContext.Consumer>
        { ({ isDarkModeEnabled }) => (
          <Footer
            bottomLinks={bottomLinks}
            copyrightText={copyrightText}
            links={links}
            socialIcons={socialIcons}
            isDarkModeEnabled={isDarkModeEnabled}
          />
        )}
      </ThemeContext.Consumer>
    )}
  />
);
