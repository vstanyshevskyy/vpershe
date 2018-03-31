import React from 'react'

let slideId = 0;
let activeSlideId;
let NEW_SLIDES = [];
// test data
const HELP_SLIDES = [
	{
		id: slideId,
		state: true,
		title: 'Salads and first dishes',
		description: '#1',
		Image: 'https://i.imgur.com/41VJ6df.jpg'
	},
	{
		id: slideId + 2,
		state: false,
		title: 'Some third-party dish',
		description: '#3',
		Image: 'https://i.imgur.com/TWsuMw1.jpg'
	}
];

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: HELP_SLIDES,
			speed: 100,
			reel: false
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
		this.setState(function() {
			return {
				reel: turning? true : false
			}
		});
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
		NEW_SLIDES = this.state.slides;
		this.setState(function() {
			return {
				slides: NEW_SLIDES
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
		NEW_SLIDES = this.state.slides;
		this.setState(function() {
			return {
				slides: NEW_SLIDES
			}
		});
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
							<li style={slide.style} className={slide.state === true? 'active':'hidden'} key={slide.id}>
								<h4>{slide.title}</h4>
								<p>{slide.description}</p>
								<img src={slide.Image}/>
							</li>
						)
					})}
				</ul>
				<button onClick={() => { this.autoReel(true) }}>turn on auto reel</button>
			</div>
		)
	}
}

export default Slider;