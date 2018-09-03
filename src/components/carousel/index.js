import React from 'react';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import Link, { withPrefix } from 'gatsby-link';
import './index.less';

export default props => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    lazyLoad: true,
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
  return (
    <Slider className="slider" {...settings}>
      {
        props.items.map(i => {
          const url = `/${i.contentType}/${i.path}`;
          return (
            <div key={url} className="slider__item">
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
};
