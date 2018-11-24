import React from 'react';
import { withPrefix } from 'gatsby-link';
import classNames from 'classnames';

class SliderButton extends React.Component {
  render() {
    const isPrev = this.props.className.indexOf('slick-prev') > -1;
    const btnClasses = classNames('slider__arrow', {
      'slider__arrow--prev': isPrev,
      'slider__arrow--next': !isPrev
    });
    return (
      <button {...this.props}>
        <img className={btnClasses} src={withPrefix('assets/navigation.svg')} alt="" />
        {this.children}
      </button>
    );
  }
}

export default SliderButton;
