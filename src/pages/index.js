import React from 'react';
import { withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Subscribe from '../components/subscribe';
import HomePageArticles from '../components/home-page-articles';
import AboutProject from '../components/about-project';

export default function Template () {
  return (
    <Layout>
      <div id="content">
        <SEO />
        <HomePageArticles />
        <Subscribe />
        <AboutProject />
      </div>
    </Layout>
  );
}
