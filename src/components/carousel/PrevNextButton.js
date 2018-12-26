import React from 'react';
import { withPrefix } from 'gatsby';
import classNames from 'classnames';

class SliderButton extends React.Component {
  render() {
    const { className } = this.props;
    const isPrev = className.indexOf('slick-prev') > -1;
    const btnClasses = classNames('slider__arrow', {
      'slider__arrow--prev': isPrev,
      'slider__arrow--next': !isPrev
    });
    return (
      <button {...this.props} type="button">
        <img className={btnClasses} src={withPrefix('assets/navigation.svg')} alt="" />
        {this.children}
      </button>
    );
  }
}

export default SliderButton;
