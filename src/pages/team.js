import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import './team.less';
import Layout from '../layouts';
import SEO from '../components/SEO';

export default function Template ({ data: { team: { edges: [{ node: { frontmatter: pageData } }] } } }) {
  return (
    <Layout>
      <div className="index-page__content-wrapper" id="content">
        <SEO data={pageData} />
        <ul className="teams-list">
          {
            pageData.groups.map(({ people = [], name: groupName, perLine }) => {
              if (!people || !people.length) {
                return null;
              }
              return (
                <li className="teams-list__team" key={groupName}>
                  <h2 className="teams-list__team-title">{groupName}</h2>
                  <ul className="teams-list__team-persons-list">
                    { people.map(({
                      person: {
                        email, name, role, details, photo
                      }
                    }) => (
                      <li className={`teams-list__team-person teams-list__team-person--1-of-${perLine}`} key={name}>
                        { photo
                          ? <Img alt={name} className="teams-list__team-person-photo" fluid={photo.childImageSharp.fluid} />
                          : <div className="teams-list__team-person-silhoute" />
                        }
                        <p className="teams-list__team-person-attribute teams-list__team-person-attribute--name">{name || ''}</p>
                        <p className="teams-list__team-person-attribute teams-list__team-person-attribute--role">{(role || '')}</p>
                        <p className="teams-list__team-person-attribute teams-list__team-person-attribute--email">{(email || '')}</p>
                        <p className="teams-list__team-person-attribute teams-list__team-person-attribute--details">{(details || '')}</p>
                      </li>
                    ))}
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
}
`;
