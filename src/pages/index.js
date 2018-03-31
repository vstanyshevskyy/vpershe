import React from 'react';
require('../layouts/bootstrap/dist/css/bootstrap.css');
require('./pages.css');
import HomePage from './homepage';
import NavBar from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';

const IndexPage = () => (
  <div className='container-fluid'>
	  <NavBar />
	  <HomePage />
	  <Footer />
  </div>
);

export default IndexPage;

