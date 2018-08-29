import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Link, { withPrefix } from 'gatsby-link';
import './index.less';

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1160,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 4,
            initialSlide: 0,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 980,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 820,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 645,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        }
      ]
    };
    return (
      <Slider className="slider" {...settings}>
        {
          this.props.items.map(i => (
            <div className="slider__item">
              <Link to={`/${i.contentType}/${i.path}`} className="slider__item-image-link ">
                <img alt="OrganiCup: альтернатива є" className="slider__item-picture" src={withPrefix(i.carousel_image)} />
              </Link>
              <Link to={`/${i.contentType}/${i.path}`} className="slider__item-title ">{i.title}</Link>
            </div>
          ))
        }
      </Slider>
    );
  }
}