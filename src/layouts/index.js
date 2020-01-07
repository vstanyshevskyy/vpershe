import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import { Location } from '@reach/router';

import ThemeContext from '../context/ThemeContext';
import Questionbox from '../components/questionbox';
import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';

import '../components/styleguide/index.less';
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
    this.setState(prevState => ({ isPageBlurred: !prevState.isPageBlurred }));
  }

  render () {
    const {
      children, location, data: {
        QuestionBoxSettings: { edges: [{ node: { frontmatter: questionBoxSettings } }] },
        SubscribeSettings: { edges: [{ node: { frontmatter: subscribeSettings } }] }
      }
    } = this.props;
    const { isDarkModeEnabled } = this.context;
    const isHomePage = !(location.pathname.split('/')[1]);
    const { isPageBlurred } = this.state;
    const wrapperClasses = classNames(
      'page-wrapper',
      {
        'page-wrapper--dark': isDarkModeEnabled,
        'page-wrapper--custom': !isHomePage,
        'page-wrapper--blurred': isPageBlurred
      },
      `page-wrapper--${location.pathname.split('/')[1]}`
    );
    return (
      <React.Fragment>
        <div className={wrapperClasses}>
          <Helmet bodyAttributes={{ class: classNames({ 'body--dark': isDarkModeEnabled }) }}>
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
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://www.google.com" />
          </Helmet>
          <a href="#content" className="skip-navigation">Пропустити навігацію</a>
          <Navbar />
          {
            !isHomePage
              ? <img className="wrapper__graffiti graffiti wrapper__graffiti--stars" loading="lazy" alt="" width="86" src={withPrefix('assets/graffiti/stars.svg')} aria-hidden="true" />
              : null
          }
          <img className="wrapper__graffiti graffiti wrapper__graffiti--arrows" loading="lazy" alt="" width="45" src={withPrefix('assets/graffiti/arrows.svg')} aria-hidden="true" />
          {children}
          {
            location.pathname.split('/')[1]
              ? (
                <Subscribe
                  title={subscribeSettings.title}
                  emailPlaceholder={subscribeSettings.email_placeholder}
                  emailLabel={subscribeSettings.email_label}
                  buttonText={subscribeSettings.button_text}
                  thanksTitle={subscribeSettings.thanks_title}
                  thanksText={subscribeSettings.thanks_text}
                />
              )
              : null
          }

          <Footer />
        </div>
        <Questionbox {...questionBoxSettings} onBoxToggle={this.blurPage} />
      </React.Fragment>
    );
  }
}

Layout.contextType = ThemeContext;

const pageQuery = graphql`
query FooterData {
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

export default ({ children }) => (
  <StaticQuery
    query={pageQuery}
    render={data => (
      <Location>
        {({ location }) => (<Layout data={data} location={location}>{children}</Layout>)}
      </Location>
    )}
  />
);
