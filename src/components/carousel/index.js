import React from 'react';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Link, { withPrefix } from 'gatsby-link';
import SliderButton from './PrevNextButton';
import './index.less';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };

    this.onSliderInit = this.onSliderInit.bind(this);
    this.settings = {
      prevArrow: <SliderButton />,
      nextArrow: <SliderButton />,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      lazyLoad: true,
      onInit: this.onSliderInit,
      responsive: [
        {
          breakpoint: 1160,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            initialSlide: 0
          }
        },
        {
          breakpoint: 980,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 645,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  }
  onSliderInit() {
    this.setState({
      isLoaded: true
    });
  }
  render() {
    const sliderClasses = classNames('slider', this.props.className);
    return (
      <Slider className={sliderClasses} {...this.settings}>
        {
          this.props.items.map((i, index) => {
            const url = `/${i.contentType}/${i.path}`;
            const classes = classNames('slider__item', {
              'slider__item--hidden': index > 0 && !this.state.isLoaded
            });
            return (
              <div key={url} className={classes}>
                <Link to={url} className="slider__item-image-link ">
                  <img width="170" height="170" alt={i.carousel_image_alt} className="slider__item-picture" src={withPrefix(i.carousel_image)} />
                </Link>
                <Link to={url} className="slider__item-title ">{i.title}</Link>
              </div>
            );
          })
        }
      </Slider>
    );
  }
}
