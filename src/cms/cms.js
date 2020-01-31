import CMS from 'netlify-cms-app';
import { uk } from 'netlify-cms-locales';
import config from './config';

/**
 * Optionally pass in a config object. This object will be merged into `config.yml` if it exists
 */
CMS.registerLocale('uk', uk);

CMS.init({
  config: {
    ...config,
    locale: 'uk'
  }
});
