import React from 'react';

const FirebaseSubmitter = ({children, apiUrl}) => {
  const onSubmit = (data) => {
    return window.fetch(apiUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json());
  }

  const childrenWithProps = React.Children.map(children, child => React.cloneElement(child,
    { onSubmit }));

  return (
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  );
}

export default FirebaseSubmitter;