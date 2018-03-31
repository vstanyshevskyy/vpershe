import React from 'react';
import NavBar from '../components/Nav/Nav';
require('../layouts/bootstrap/dist/css/bootstrap.css');
require('./pages.css');

const IndexPage = () => (
  <div className='container-fluid'>
	  <NavBar />
	  <div className='row'>
		  <div className='col-md-12'>
			  <div className='row'>
				  <div className='col-md-12'>
					  <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
						  <div className="carousel-inner">
							  <div className="carousel-item active">
								  <img className="d-block w-100" src="" alt="First slide" />
							  </div>
						  </div>
						  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
							  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
							  <span className="sr-only">Previous</span>
						  </a>
						  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
							  <span className="carousel-control-next-icon" aria-hidden="true"></span>
							  <span className="sr-only">Next</span>
						  </a>
					  </div>
				  </div>
			  </div>
		  </div>
		  <div className='col-md-12'>
			  <div className='row'>
				  <div className='col-md-4'></div>
			  </div>
		  </div>
	  </div>
	  <div className='Slider'>

	  </div>
  </div>
);

export default IndexPage;
