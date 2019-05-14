import collections from './collections';

const config = {
  load_config_file: false,
  backend: {
    name: 'github',
    repo: 'vstanyshevskyy/vpershe',
    branch: 'adventures'
  },
  media_folder: 'static/assets/uploads',
  public_folder: '/assets/uploads',
  collections
};

export default config;
