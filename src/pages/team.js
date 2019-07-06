import React from 'react';
import { graphql, withPrefix } from 'gatsby';
import Img from 'gatsby-image';
import './team.less';
import Layout from '../layouts';
import SEO from '../components/SEO';

export default function Template ({ data }) {
  const pageData = data.team.edges[0].node.frontmatter;
  const settings = data.settings.edges[0].node.frontmatter;
  return (
    <Layout>
      <div className="index-page__content-wrapper">
        <SEO data={pageData} defaults={settings} />
        <ul className="teams-list">
          {
            pageData.groups.map(group => (group.people && group.people.length
              ? (
                <li className="teams-list__team" key={group.name}>
                  <h2 className="teams-list__team-title">{group.name}</h2>
                  <ul className="teams-list__team-persons-list">
                    {(group.people || []).map(p => (
                      <li className={`teams-list__team-person teams-list__team-person--1-of-${group.perLine}`} key={p.person.email}>
                        { p.person.photo
                          ? <Img alt={p.person.name} className="teams-list__team-person-photo" fluid={p.person.photo.childImageSharp.fluid} />
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
                      ...GatsbyImageSharpFluid
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
