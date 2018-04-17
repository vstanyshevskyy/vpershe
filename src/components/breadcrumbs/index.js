import React from 'react';
import Link from 'gatsby-link';
import './index.less';

const defaultLinks = [{
  text: 'Головна',
  url: '/'
}];

export default props => {
  const links = [...defaultLinks, ...props.links];
  return (
    <nav className="breadcrumbs col-12">
      <p className="breadcrumbs-label">Ви тут:</p>
      <ol itemScope="" itemType="http://schema.org/BreadcrumbList">
        {links.map((link, index) => {
          const linkNameEl = <span itemProp="name">{link.text}</span>;
          const positionEl = <meta itemProp="position" content={index + 1} />;
          return (
            <li
              className="breadcrumbs-item"
              itemProp="itemListElement"
              itemScope=""
              itemType="http://schema.org/ListItem"
            >
              {index === links.length - 1 ? (
                <span>
                  {linkNameEl}
                  {positionEl}
                </span>
              ) : (
                <Link itemProp="item" to={link.url}>
                  {linkNameEl}
                  {positionEl}
                </Link>
              )}
            </li>);
        })}
      </ol>
    </nav>
  );
};
