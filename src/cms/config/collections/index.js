import config from '../../../config'
import posts from './posts.js';
import pages from './pages.js';
import settings from './settings.js';

export default [
  ...config.categories.map(c => ({
    ...posts,
    filter: {
      field: 'category',
      value: c.value
    },
    name: c.value,
    label: c.label
  })),
  posts,
  pages,
  settings
];
