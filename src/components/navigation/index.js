import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import ThemeContext from '../../context/ThemeContext';
import Navbar from './NavigationDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        navigation: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "navbar_settings"} }}){
          edges{
            node{
              frontmatter{
                links {
                  text
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({ navigation: { edges: [{ node: { frontmatter: { links, socialIcons } } }] } }) => (
      <Location>
        {
          ({ location }) => (
            <ThemeContext.Consumer>
              { ({ isDarkModeEnabled, toggleDark }) => (
                <Navbar
                  location={location.pathname}
                  className={location.pathname.split('/')[1]}
                  links={links}
                  isDarkModeEnabled={isDarkModeEnabled}
                  toggleDark={toggleDark}
                />
              )}
            </ThemeContext.Consumer>
          )
        }
      </Location>
    )}
  />
);
