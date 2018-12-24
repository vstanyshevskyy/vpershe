import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { withPrefix } from 'gatsby-link';

import './reset.css';
import '../components/styleguide/index.less';
import Questionbox from '../components/questionbox';
import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
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
        QuestionBoxSettings: { edges: [{ node: { frontmatter: questionBoxSettings } }] },
        SubscribeSettings: { edges: [{ node: { frontmatter: subscribeSettings } }] }
      }
    } = this.props;
    const isHomePage = !(location.pathname.split('/')[1]);
    const wrapperClasses = classNames(
      'page-wrapper',
      {
        'page-wrapper--custom': !isHomePage,
        'page-wrapper--blurred': this.state.isPageBlurred
      },
      `page-wrapper--${location.pathname.split('/')[1]}`
    );
    return (
      <React.Fragment>
        <div className={wrapperClasses}>
          <Helmet>
            <html lang="uk" />
            <link href="/assets/icon-57x57.png" sizes="57x57" rel="apple-touch-icon" />
            <link href="/assets/icon-72x72.png" sizes="72x72" rel="apple-touch-icon" />
            <link href="/assets/icon-114x114.png" sizes="114x114" rel="apple-touch-icon" />
            <link href="/assets/icon-144x144.png" sizes="144x144" rel="apple-touch-icon" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <link href="/assets/splashscreen/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="/assets/splashscreen/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
          </Helmet>
          <Navbar location={location.pathname} className={location.pathname.split('/')[1]} {...navbarSettings} />
          {
            !isHomePage
              ? <img className="wrapper__graffiti graffiti wrapper__graffiti--stars" alt="" width="86" src={withPrefix('assets/graffiti/stars.svg')} aria-hidden="true" />
              : null
          }
          <img className="wrapper__graffiti graffiti wrapper__graffiti--arrows" alt="" width="45" src={withPrefix('assets/graffiti/arrows.svg')} aria-hidden="true" />
          {children()}
          {
            location.pathname.split('/')[1]
              ? <Subscribe
                title={subscribeSettings.title}
                emailPlaceholder={subscribeSettings.email_placeholder}
                emailLabel={subscribeSettings.email_label}
                buttonText={subscribeSettings.button_text}
                thanksTitle={subscribeSettings.thanks_title}
                thanksText={subscribeSettings.thanks_text}
              />
              : null
          }

          <Footer {...footerData} {...navbarSettings} />
        </div>
        <Questionbox {...questionBoxSettings} onBoxToggle={this.blurPage} />
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
  QuestionBoxSettings: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "ask_box_settings"}}}) {
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
