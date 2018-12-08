import React from 'react';
import graphql from 'graphql';
import { withPrefix } from 'gatsby-link';
import './team.less';
import SEO from '../components/SEO';

export default function Template (props) {
  const data = props.data.team.edges[0].node.frontmatter;
  const settings = props.data.settings.edges[0].node.frontmatter;
  return (
    <div className="index-page__content-wrapper">
      <SEO data={data} defaults={settings} />
      <ul className="teams-list">
        {
          data.groups.map(group => (group.people && group.people.length
            ? (
              <li className="teams-list__team">
                <h2 className="teams-list__team-title">{group.name}</h2>
                <ul className="teams-list__team-persons-list">
                  {(group.people || []).map(p => (
                    <li className={`teams-list__team-person teams-list__team-person--1-of-${group.perLine}`}>
                      { p.person.photo
                        ? <img className="teams-list__team-person-photo" src={withPrefix(p.person.photo)} alt={p.person.name} />
                        : <div className="teams-list__team-person-silhoute" />
                      }
                      <p className="teams-list__team-person-attribute teams-list__team-person-attribute--name">{p.person.name}</p>
                      <p className="teams-list__team-person-attribute teams-list__team-person-attribute--role">{p.person.role}</p>
                      <p className="teams-list__team-person-attribute teams-list__team-person-attribute--email">{p.person.email}</p>
                      <p className="teams-list__team-person-attribute teams-list__team-person-attribute--details">{p.person.details}</p>
                    </li>
                  ))}
                </ul>
              </li>
            )
            : null))
        }
      </ul>
    </div>
  );
}

export const pageQuery = graphql`
query TeamPage {
  team: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "team"}}}) {
    edges {
      node {
        frontmatter {
          contentType
          title
          fbImage
          metaKeywords
          metaDescription
          groups {
            name
            perLine
            people {
              person {
                email
                name
                role
                photo
              }
            }
          }
        }
      }
    }
  }
  settings: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "general_settings"}}}) {
    edges {
      node {
        frontmatter {
          url
          favicon
          titleTemplate
          title
          metaDescription
          metaKeywords
          fbTitle
          fbDescription
          fbImage
        }
      }
    }
  }
}
`;
