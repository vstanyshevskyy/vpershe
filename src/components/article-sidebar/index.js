/* eslint-disable camelcase */
import React from 'react';
import { withPrefix } from 'gatsby';
import classNames from 'classnames';
import RelatedLinks from '../related-links';
import ThemeContext from '../../context/ThemeContext';
import './index.less';

export default ({
  relatedLinks,
  relatedLinksTitle,
  isMobile
}) => {
  const asideClassNames = classNames('content__sidebar', {
    'content__sidebar--mobile': isMobile
  });
  return (
    <ThemeContext.Consumer>
      {({ isDarkModeEnabled }) => (
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
              <a className={classNames('addthis_custom_button addthis_button_facebook', { 'addthis_custom_button--dark': isDarkModeEnabled })}>
                <img className="addthis_button_icon" loading="lazy" height="23" src={withPrefix('assets/facebook.svg')} alt="Поширити в Facebook" />
              </a>
              <a className={classNames('addthis_custom_button addthis_button_twitter', { 'addthis_custom_button--dark': isDarkModeEnabled })}>
                <img className="addthis_button_icon" loading="lazy" height="20" src={withPrefix('assets/twitter.svg')} alt="Поширити в Twitter" />
              </a>
              <a className={classNames('addthis_custom_button addthis_button_link', { 'addthis_custom_button--dark': isDarkModeEnabled })}>
                <img className="addthis_button_icon" loading="lazy" height="20" src={withPrefix('assets/link.svg')} alt="Скопіювати посилання" />
              </a>
              <a className={classNames('addthis_custom_button addthis_button_email', { 'addthis_custom_button--dark': isDarkModeEnabled })}>
                <img className="addthis_button_icon" loading="lazy" height="17" src={withPrefix('assets/envelope.svg')} alt="Поширити як лист" />
              </a>
            </div>
          </div>
        </aside>
      )}
    </ThemeContext.Consumer>
  );
};
