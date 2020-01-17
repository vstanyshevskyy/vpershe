import React from 'react';
import { withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import Carousel from '../components/carousel';
import RecentAdviceList from '../components/recent-advice-list';
import ArticlesTiles from '../components/recent-articles-tiles';
import RecentStories from '../components/recent-stories-list';
import AboutProject from '../components/about-project';

export default function Template () {
  return (
    <Layout>
      <div id="content">
        <SEO />
        <Carousel />
        <ArticlesTiles />
        <img className="homepage__graffiti homepage__graffiti--eye" loading="lazy" alt="" width="76" src={withPrefix('assets/graffiti/eye.svg')} aria-hidden="true" />
        <RecentStories />
        <div className="homepage__graffiti-wrapper">
          <img className="homepage__graffiti homepage__graffiti--vpershe" loading="lazy" alt="" width="241" src={withPrefix('assets/graffiti/vpershe.svg')} aria-hidden="true" />
        </div>
        <Subscribe />
        <AboutProject />
        <hr />
        <RecentAdviceList />
      </div>
    </Layout>
  );
}
