import React from 'react';

class SheetsSubmitter extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const { apiUrl } = this.props;

    return window.fetch(apiUrl, {
      method: 'POST',
      body: data
    })
      .then(res => res.json());
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child,
      { onSubmit: this.handleSubmit }));
    return (
      <React.Fragment>
        {childrenWithProps}
      </React.Fragment>
    );
  }
}

export default SheetsSubmitter;
