import React from 'react'
import Link from 'gatsby-link'
require('./Sider.css');

let slideId = 0;
let activeSlideId;
// test data
let HELP_SLIDES = [
	{
		id: slideId,
		state: true,
		title: 'News Title1',
		description: 'Outside of a dog, a book is a man`s best friend. Inside of a dog it`s too dark to read' +
		'Read more at: https://www.brainyquote.com/topics/dog',
		Image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg'
	},
	{
		id: slideId + 1,
		state: false,
		title: 'News Title2',
		description: 'Outside of a dog, a book is a man`s best friend. Inside of a dog it`s too dark to read\' +\n' +
		'\t\t\'Read more at: https://www.brainyquote.com/topics/dog',
		Image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg'
	},
	{
		id: slideId + 2,
		state: false,
		title: 'News Title3',
		description: 'Outside of a dog, a book is a man`s best friend. Inside of a dog it`s too dark to read\' +\n' +
		'\t\t\'Read more at: https://www.brainyquote.com/topics/dog',
		Image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg'
	}
];

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: HELP_SLIDES,
			speed: 100,
			autoReel: false
		};
	}
	componentDidMount() {
		this.setState(function() {
			return {
				speed: 1800
			}
		});
		setTimeout(() => {
			// HERE WE CAN RUN FUNCTION FOR CHANGE HELP_SLIDERS data to real
			// and re-check
		}, 4000);
	}
	autoReel(turning) {
		if (turning) {
			const reelLeft = setInterval(() => {
				this.slideLeft();
				console.log('Slider get left..');
			}, this.state.speed);
			const reelRight = setInterval(() => {
				this.slideRight();
				console.log('Slider get right..');
			}, this.state.speed*2);
			/* setTimeout(() => {
				clearInterval(reelLeft);
				clearInterval(reelRight);
			}, 24000); */
		}
	}
	slideLeft() {
		this.state.slides.map(slide => {
			if (slide.state === true) {
				slide.state = false;
				activeSlideId = slide.id;
			}
		});
		if (activeSlideId <= 0) {
			return false;
		}
		this.state.slides[activeSlideId - 1].state = true;
		HELP_SLIDES = this.state.slides;
		this.setState(function() {
			return {
				slides: HELP_SLIDES
			}
		});
	}
	slideRight() {
		this.state.slides.map(slide => {
			if (slide.state === true) {
				slide.state = false;
				activeSlideId = slide.id;
			}
		});
		if (activeSlideId >= 2) {
			return false;
		}
		this.state.slides[activeSlideId + 1].state = true;
		HELP_SLIDES = this.state.slides;
		this.setState(function() {
			return {
				slides: HELP_SLIDES
			}
		});
	}
	choiceNews(param) {
		window.location.assign(window.location.hostname + '/' + param);
	}
	render() {
		return (
			<div className="Slider">
				<p>{this.state.title}</p>
				<div className="slide-controls">
					<button onClick={(e) => {this.slideLeft(e)}}>back</button>
					<button onClick={(e) => {this.slideRight(e)}}>forward</button>
				</div>
				<ul className="slider-slides">
					{this.state.slides.map(slide => {
						return (
							<li style={slide.style} className={slide.state === true? 'active slide':'hidden slide'} key={slide.id}>
								<h4 className='slide-title'>{slide.title}</h4>
								<p className='slide-description'>{slide.description}</p>
								<img src={slide.Image}/>
								<button className='btn-round slide-btn' onClick={() => this.choiceNews(slide.id)}>
									explore this news
								</button>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Slider;