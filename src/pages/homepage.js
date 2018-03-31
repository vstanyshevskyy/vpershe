import React from 'react';
import NavBar from '../components/Nav/Nav';
import Slider from '../components/Slider/Slider';

const HomePage = () => (
	<div className='container-fluid'>
		<NavBar />
		<div className='row'>
			<div className='col-md-12'>
				<Slider />
			</div>
			<div className='col-md-12'>
				<div className='row'>
					<div className='col-md-4'>..</div>
				</div>
			</div>
		</div>
	</div>
);

export default HomePage;
