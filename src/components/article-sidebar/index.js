/* eslint-disable camelcase */
import React from 'react';
import { withPrefix } from 'gatsby';
import classNames from 'classnames';
import RelatedLinks from '../related-links';

export default ({
  relatedLinks,
  relatedLinksTitle,
  isMobile
}) => {
  const asideClassNames = classNames('content__sidebar', {
    'content__sidebar--mobile': isMobile
  });
  return (
    <aside className={asideClassNames}>
      {
        relatedLinks && relatedLinks.length
          ? (
            <RelatedLinks
              links={relatedLinks}
              title={relatedLinksTitle}
            />
          )
          : null
      }
      <div className="content__addthis addthis_toolbox">
        <div className="content__addthis-images-container custom_images">
          <a className="addthis_custom_button addthis_button_facebook"><img className="addthis_button_icon" height="23" src={withPrefix('assets/facebook.svg')} alt="Share with Facebook" /></a>
          <a className="addthis_custom_button addthis_button_twitter"><img className="addthis_button_icon" height="20" src={withPrefix('assets/twitter.svg')} alt="Share with Twitter" /></a>
          <a className="addthis_custom_button addthis_button_link"><img className="addthis_button_icon" height="20" src={withPrefix('assets/link.svg')} alt="Copy Link" /></a>
          <a className="addthis_custom_button addthis_button_email"><img className="addthis_button_icon" height="17" src={withPrefix('assets/envelope.svg')} alt="Share via Twitter" /></a>
        </div>
      </div>
    </aside>
  );
};
