import React from 'react'
import { DATA_MOCKS } from '../../utils/entity-mocks';
require('./Sider.css');

let activeSlideId;
// test data
let HELP_SLIDES = DATA_MOCKS.SLIDER_MOCK;

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: HELP_SLIDES || [],
			speed: 100,
			articles: props.articles,
			autoReel: false
		};
	}
	componentDidMount() {
		setTimeout(() => {
			const updatedSlides = [];
			if (this.state.articles.length) {
				const slidesCount = this.state.articles.length;
				for (let i = 0; i < slidesCount; i++) {
					if (i > 2) {
						break;
					}
					const current = HELP_SLIDES[i];
					current.title = this.state.articles[i].title;
					current.image = this.state.articles[i].image;
					current['href'] = this.state.articles[i].path;
					updatedSlides.push(current);
				}
				this.setState(() => {
					return {
						slides: updatedSlides
					}
				})
			} else {
				this.setState({
					slides: HELP_SLIDES
				});
			}
		}, 1000);
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
		window.location.assign('/articles/' + param);
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
					{this.state.slides.map((slide, index) => {
						return (
							<li style={slide.style} className={slide.state === true? 'active slide':'hidden slide'} key={slide.id}>
								<h4 className='slide-title'>{slide.title}</h4>
								<p className='slide-description'>{"Slide #"} {slide.id}</p>
								<img src={slide.image}/>
								<button className='btn-round slide-btn' onClick={() => this.choiceNews(slide.href)}>
									Продивитися новину #{index}
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