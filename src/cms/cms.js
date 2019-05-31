import CMS from 'netlify-cms-app';
import config from './config';

/**
 * Optionally pass in a config object. This object will be merged into `config.yml` if it exists
 */

CMS.init({
  config
});
