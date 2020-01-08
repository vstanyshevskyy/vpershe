import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Form from './FormDisplay';
import SheetsSubmitter from '../sheets-submitter';
import ThemeContext from '../../context/ThemeContext';
import config from '../../config';

export default () => (
  <StaticQuery
    query={graphql`
      query SubscribeQuery {
        SubscribeSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "subscribe_form_settings"}}}) {
          edges {
            node {
              frontmatter {
                title
                emailPlaceholder: email_placeholder
                emailLabel: email_label
                buttonText: button_text
                thanksTitle: thanks_title
                thanksText: thanks_text
              }
            }
          }
        }
      }
    `}
    isDarkModeEnabled
    render={({ SubscribeSettings: { edges: [{ node: { frontmatter: subscribeFormParams } }] } }) => (
      <ThemeContext.Consumer>
        {
          ({ isDarkModeEnabled }) => (
            <SheetsSubmitter apiUrl={config.subscribeApiUrl}>
              <Form {...subscribeFormParams} isDarkModeEnabled={isDarkModeEnabled} />
            </SheetsSubmitter>
          )
        }
      </ThemeContext.Consumer>
    )}
  />
);
