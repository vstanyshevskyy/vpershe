import React from 'react';
import Img from 'gatsby-image';

export default props => {
  let { normalizedProps, fluid: { presentationWidth }, style } = props;
  if (presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(style || {}),
        maxWidth: presentationWidth,
        margin: '0 auto' // Used to center the image
      }
    };
  }

  return <Img {...normalizedProps} />;
};
