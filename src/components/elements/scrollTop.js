import React from 'react';
import $ from 'jquery';
import './elements.css';

export default class ScrollTop extends React.Component {
  clickTop() {
    $(document).ready(function() {
      $('html, body').animate({
        scrollTop: $('#brand').offset().top
      }, 1800);
    });
  }
  render() {
    return (
      <div onClick={this.clickTop} className="btn-scroll-top shadow-card" role="presentation">
        <span>To Top</span>
        <i className="material-icons">vertical_align_top</i>
      </div>
    );
  }
}
