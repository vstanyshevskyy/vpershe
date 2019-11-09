import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import './team.less';
import Layout from '../layouts';
import SEO from '../components/SEO';

export default function Template ({ data }) {
  const pageData = data.team.edges[0].node.frontmatter;
  const settings = data.settings.edges[0].node.frontmatter;

  return (
    <Layout>
      <div className="index-page__content-wrapper" id="content">
        <SEO data={pageData} defaults={settings} />
        <ul className="teams-list">
          {
            pageData.groups.map(group => {
              if (!group.people || !group.people.length) {
                return null;
              }
              return (
                <li className="teams-list__team" key={group.name}>
                  <h2 className="teams-list__team-title">{group.name}</h2>
                  <ul className="teams-list__team-persons-list">
                    {(group.people || []).map(p => {
                      const {
                        email, name, role, details, photo
                      } = p.person;
                      return (
                        <li className={`teams-list__team-person teams-list__team-person--1-of-${group.perLine}`} key={name}>
                          { p.person.photo
                            ? <Img alt={name} className="teams-list__team-person-photo" fluid={photo.childImageSharp.fluid} />
                            : <div className="teams-list__team-person-silhoute" />
                          }
                          <p className="teams-list__team-person-attribute teams-list__team-person-attribute--name">{name}</p>
                          { role && role.trim().length
                            ? <p className="teams-list__team-person-attribute teams-list__team-person-attribute--role">{role}</p>
                            : null
                          }
                          { email && email.trim().length
                            ? <p className="teams-list__team-person-attribute teams-list__team-person-attribute--email">{email}</p>
                            : null
                          }
                          { details && details.trim().length
                            ? <p className="teams-list__team-person-attribute teams-list__team-person-attribute--details">{details}</p>
                            : null
                          }
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
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
          fbImage  {
            relativePath
          }
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
                photo {
                  relativePath
                  childImageSharp {
                    fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
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
          favicon  {
            relativePath
          }
          titleTemplate
          title
          metaDescription
          metaKeywords
          fbTitle
          fbDescription
          fbImage {
            relativePath
          }
        }
      }
    }
  }
}
`;
