import React from 'react';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import SliderButton from './PrevNextButton';
import { getUniqueId, CardClickHelper } from '../../helpers';
import './index.less';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };

    this.clickHelper = new CardClickHelper();

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
    const { className, items } = this.props;
    const { isLoaded } = this.state;
    const sliderClasses = classNames('slider', className);
    return (
      <Slider className={sliderClasses} {...this.settings}>
        {
          items.map((i, index) => {
            const url = `/${i.contentType}/${i.path}`;
            const itemClassName = 'slider__item';
            const uid = `${itemClassName}-${getUniqueId(url)}`;
            const classes = classNames(itemClassName, {
              'slider__item--hidden': index > 0 && !isLoaded
            });

            return i.image ? (
              <div
                key={uid}
                className={classes}
                onMouseUp={e => this.clickHelper.onMouseUp(e, index)}
                onMouseDown={e => this.clickHelper.onMouseDown(e)}
              >
                <Img alt="" className="slider__item-picture" fluid={i.image.childImageSharp.fluid} />
                <Link to={url} ref={el => this.clickHelper.addLink(el, index)} className="slider__item-title ">{i.title}</Link>
              </div>
            ) : null;
          })
        }
      </Slider>
    );
  }
}
