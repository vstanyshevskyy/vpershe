import React from 'react';
import { Link } from 'gatsby';
import ArticlesList from '../articles-list';

import './index.less';

export default ({ items }) => (
  <div className="recent-stories">
    <h2 className="recent-stories__title">Історії</h2>
    <ArticlesList items={items} />
    <Link to="/stories" className="link__all-records">Всі історії</Link>
  </div>
);
