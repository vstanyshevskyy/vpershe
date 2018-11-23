import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import classNames from 'classnames';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './reset.css';
import '../components/styleguide/index.less';
import Feedback from '../components/feedback';
import Navbar from '../components/Nav';
import Footer from '../components/footer';
import Subscribe from '../components/Subscribe';
import './index.less';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageBlurred: false
    };
    this.blurPage = this.blurPage.bind(this);
  }
  blurPage() {
    this.setState({
      isPageBlurred: !this.state.isPageBlurred
    });
  }
  render () {
    const {
      children, location, data: {
        FooterSettings: { edges: [{ node: { frontmatter: footerData } }] },
        NavbarSettings: { edges: [{ node: { frontmatter: navbarSettings } }] },
        HomepageSettings: { edges: [{ node: { frontmatter: homepageSettings } }] },
        SubscribeSettings: { edges: [{ node: { frontmatter: subscribeSettings } }] }
      }
    } = this.props;
    const wrapperClasses = classNames(
      'page-wrapper',
      {
        'page-wrapper--custom': location.pathname.split('/')[1],
        'page-wrapper--blurred': this.state.isPageBlurred
      },
      `page-wrapper--${location.pathname.split('/')[1]}`
    );
    return (
      <React.Fragment>
        <div className={wrapperClasses}>
          <Helmet>
            <html lang="uk" />
          </Helmet>
          <Navbar location={location.pathname} className={location.pathname.split('/')[1]} {...navbarSettings} />
          {children()}
          <Subscribe
            className={location.pathname.split('/')[1]}
            title={subscribeSettings.title}
            emailPlaceholder={subscribeSettings.email_placeholder}
            emailLabel={subscribeSettings.email_label}
            buttonText={subscribeSettings.button_text}
            thanksTitle={subscribeSettings.thanks_title}
            thanksText={subscribeSettings.thanks_text}
          />
          <Footer {...footerData} {...navbarSettings} className={location.pathname.split('/')[1]} />
        </div>
        <Feedback
          email={homepageSettings.contactFormEmail}
          title={homepageSettings.contactFormTitle}
          onBoxToggle={this.blurPage}
        />
      </React.Fragment>
    );
  }
}

export default Layout;


export const pageQuery = graphql`
query FooterData {
  FooterSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
    edges{
     node{
       frontmatter{
        contentType
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
  HomepageSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepage_settings"}}}) {
    edges {
      node {
        frontmatter {
          contactFormEmail
          contactFormTitle
        }
      }
    }
  }
  SubscribeSettings: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "subscribe_form_settings"}}}) {
    edges {
      node {
        frontmatter {
          title
          email_placeholder
          email_label
          button_text
          thanks_title
          thanks_text
        }
      }
    }
  }
}
`;
