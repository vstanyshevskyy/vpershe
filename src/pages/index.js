import React from 'react';
require('../layouts/bootstrap/dist/css/bootstrap.css');
require('./pages.css');
import HomePage from './homepage';

const IndexPage = () => (
  <div className='container-fluid'>
	  <HomePage />
  </div>
);

export default IndexPage;

