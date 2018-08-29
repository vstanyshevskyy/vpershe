import React, { Component } from 'react';
import graphql from 'graphql';
import Link, { withPrefix } from 'gatsby-link';
import moment from 'moment';
import './content.less';
import TagsList from '../components/tags';
import SEO from '../components/SEO';

export default class IndexPage extends Component {
  render() {
    moment.locale('uk');
    const pageData = Object.assign({}, {
      html: this.props.pathContext.data.html
    }, this.props.pathContext.data.frontmatter);
    // console.log(pageData);
    console.log(pageData.publishTime)
    console.log(moment(pageData.publishTime).format('LL'))
    return (
      <div className={`index-page__content-wrapper index-page__content-wrapper--${pageData.contentType}`}>
        <article>
          <img src={withPrefix(pageData.image)} alt="" />
          <h1 className="content__title">{pageData.title}</h1>
          <div className="content__subtitle">{pageData.title}</div>
          <div className="content__date">{moment(pageData.publishTime).format('LL')}</div>
          <div className="content__content" dangerouslySetInnerHTML={{ __html: pageData.html }} />
        </article>
        <aside>
          {
            pageData.tags.length
              ? <TagsList pageName={pageData.contentType} tags={pageData.tags} />
              : null
          }
        </aside>
      </div>
    );
  }
}