import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Config from '../../config';
import SheetsSubmitter from '../sheets-submitter';
import ThemeContext from '../../context/ThemeContext';
import QuestionboxForm from './QuestionboxDisplay';

export default ({ onBoxToggle }) => (
  <StaticQuery
    query={graphql`
      query QuestionBoxQuery {
        questionBoxSettings: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "ask_box_settings"}}}) {
          edges {
            node {
              frontmatter {
                toggleButtonText
                formInstructions
                emailLabel
                allowToShareLabel
                yesLabel
                noLabel
                questionAreaLabel
                submitButtonText
                thanksTitle
                thanksTextAllowedToShare
                thanksTextNotAllowedToShare
              }
            }
          }
        }
      }
    `}
    render={({questionBoxSettings: { edges: [{ node: { frontmatter: questionboxParams } }] } }) => (
      <ThemeContext.Consumer>
        { ({ isDarkModeEnabled }) => (
          <SheetsSubmitter apiUrl={Config.questionApiUrl}>
            <QuestionboxForm
              {...questionboxParams}
              onBoxToggle={onBoxToggle}
              isDarkModeEnabled={isDarkModeEnabled}
            />
          </SheetsSubmitter>
        )}
      </ThemeContext.Consumer>
    )}
  />
);
